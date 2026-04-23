import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeStringify from 'rehype-stringify';

// Process the HTML to fix image and video URLs
export function processHtml(html: string, repo: string) {
  const toRawRepoUrl = (path: string) => {
    if (path.startsWith('http')) return path;
    if (path.startsWith('/')) {
      return `https://raw.githubusercontent.com/yuvalm11/${repo}/main${path}`;
    }
    return `https://raw.githubusercontent.com/yuvalm11/${repo}/main/${path}`;
  };

  const MODEL_VIEWER_PLACEHOLDER_FILENAMES = new Set([
    'model-viewer.png',
    'model-viewer.jpg',
    'model-viewer.jpeg',
    'model-viewer.webp',
    'model-viewer-placeholder.png'
  ]);

  const extractModelPathFromAlt = (altText: string) => {
    const match = altText.match(/(?:^|\s)model:([^\s]+)(?:\s|$)/i);
    return match ? match[1].trim() : '';
  };

  // Get the appropriate video file based on the repository and attachment ID
  const getVideoFile = (repo: string, attachmentId?: string) => {
    // Map repository names and attachment IDs to their video files
    const videoFiles: { [key: string]: { [key: string]: string } } = {
      'inverted-pendulum': {
        'default': 'demo_video.mp4'
      },
      'mnist-vae': {
        'default': 'demo_video.mp4'
      },
      'motor-position-correction': {
        'default': 'demo_video.mp4'
      },
      'prompter-plotter': {
        '9e9a56d0-ac93-448c-80e3-ed26cfc0d670': 'intro_video.mp4', // First video
        'ebbefab2-2eee-4592-a7b4-9ad754dcc5d3': 'mechanics_video.mp4', // Second video
        'default': 'demo_video.mp4'
      }
    };
    
    const repoVideos = videoFiles[repo] || { 'default': 'demo_video.mp4' };
    return attachmentId ? (repoVideos[attachmentId] || repoVideos['default']) : repoVideos['default'];
  };

  // Process GitHub user attachment URLs that are videos
  let processedHtml = html.replace(
    /<img[^>]+src="(https:\/\/github\.com\/user-attachments\/assets\/([^"]+))"[^>]*alt="[^"]*video[^"]*"[^>]*>/gi,
    (match, src, attachmentId) => {
      const videoFile = getVideoFile(repo, attachmentId);
      if (!videoFile) return match;
      
      const videoUrl = `https://raw.githubusercontent.com/yuvalm11/${repo}/main/${videoFile}`;
      return `<video controls playsinline class="markdown-video" src="${videoUrl}"></video>`;
    }
  );

  // Process regular GitHub user attachment URLs (images)
  processedHtml = processedHtml.replace(
    /<img[^>]+src="(https:\/\/github\.com\/user-attachments\/assets\/[^"]+)"[^>]*>/g,
    (match, src) => {
      const assetId = src.split('/').pop();
      const rawUrl = `https://raw.githubusercontent.com/yuvalm11/${repo}/main/assets/${assetId}`;
      return match.replace(src, rawUrl);
    }
  ); 

  // Convert README placeholder images to <model-viewer>.
  // Usage in README: ![model:assets/demo.glb](model-viewer.png)
  processedHtml = processedHtml.replace(
    /<img([^>]*)src="([^"]+)"([^>]*)>/g,
    (match, beforeSrc, src, afterSrc) => {
      const filename = src.split('/').pop()?.split('?')[0]?.toLowerCase();
      if (!filename || !MODEL_VIEWER_PLACEHOLDER_FILENAMES.has(filename)) {
        return match;
      }

      const attrs = `${beforeSrc}${afterSrc}`;
      const altMatch = attrs.match(/alt="([^"]*)"/i);
      const altText = altMatch ? altMatch[1] : '';
      const modelPath = extractModelPathFromAlt(altText);
      if (!modelPath) return match;

      const modelSrc = toRawRepoUrl(modelPath);
      const posterSrc = toRawRepoUrl(src);
      const cleanedAlt =
        altText.replace(/(?:^|\s)model:[^\s]+(?:\s|$)/gi, ' ').trim() || '3D model';

      return `<model-viewer class="markdown-model-viewer" src="${modelSrc}" poster="${posterSrc}" alt="${cleanedAlt}" camera-controls touch-action="pan-y" ar ar-modes="webxr scene-viewer quick-look"></model-viewer>`;
    }
  );

  // Process regular images 
  processedHtml = processedHtml.replace(
    /<img[^>]+src="([^"]+)"[^>]*>/g,
    (match, src) => {
      const fullUrl = toRawRepoUrl(src);
      return match.replace(src, fullUrl);
    }
  );

  // Process videos
  processedHtml = processedHtml.replace(
    /<video[^>]*src="([^"]+)"[^>]*>/g,
    (match, src) => {
      if (src.startsWith('http')) {
        if (src.includes('github.com/user-attachments/assets/')) {
          const attachmentId = src.split('/').pop();
          const videoFile = getVideoFile(repo, attachmentId);
          if (!videoFile) return match;
          
          const videoUrl = `https://raw.githubusercontent.com/yuvalm11/${repo}/main/${videoFile}`;
          return `<video controls playsinline class="markdown-video" src="${videoUrl}"></video>`;
        }
        return match;
      }
      if (src.startsWith('/')) {
        const fullUrl = `https://raw.githubusercontent.com/yuvalm11/${repo}/main${src}`;
        return `<video controls playsinline class="markdown-video" src="${fullUrl}"></video>`;
      }
      const fullUrl = `https://raw.githubusercontent.com/yuvalm11/${repo}/main/${src}`;
      return `<video controls playsinline class="markdown-video" src="${fullUrl}"></video>`;
    }
  );

  // Fix images inside links: remove whitespace and add inline styling
  // This handles cases like <a><img> text</a> to make them appear on one line
  processedHtml = processedHtml.replace(
    /<a([^>]*)>\s*<img([^>]*)>\s*([^<]+)<\/a>/g,
    (match, linkAttrs, imgAttrs, text) => {
      // Add style attribute to make the link display inline
      const styleAttr = linkAttrs.includes('style=') 
        ? linkAttrs.replace(/style="([^"]*)"/, 'style="$1; display: inline-flex; align-items: center; gap: 0.25rem;"')
        : `${linkAttrs} style="display: inline-flex; align-items: center; gap: 0.25rem;"`;
      // Add inline-image class to img for additional styling
      const imgClassAttr = imgAttrs.includes('class=') 
        ? imgAttrs.replace(/class="([^"]*)"/, 'class="$1 inline-image"')
        : `${imgAttrs} class="inline-image"`;
      return `<a${styleAttr}><img${imgClassAttr}>${text.trim()}</a>`;
    }
  );

  return processedHtml;
}

// Process Markdown with math support
export async function processMarkdown(content: string, repo: string) {
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeKatex)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
      properties: {
        class: 'anchor-link'
      }
    })
    .use(rehypeStringify)
    .process(content);

  return processHtml(String(processedContent), repo);
} 