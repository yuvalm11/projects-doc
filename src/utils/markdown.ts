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
  // Get the appropriate video file based on the repository
  const getVideoFile = (repo: string) => {
    // Map repository names to their video files
    const videoFiles: { [key: string]: string } = {
      'inverted-pendulum': 'demo_video.mp4',
      'mnist-vae': 'demo_video.mp4',
      'motor-position-correction': 'demo_video.mp4',
      'prompter-plotter': 'demo_video.mp4' // You'll need to add this file to your repo
    };
    
    return videoFiles[repo] || 'demo_video.mp4';
  };

  // Process GitHub user attachment URLs that are videos
  let processedHtml = html.replace(
    /<img[^>]+src="(https:\/\/github\.com\/user-attachments\/assets\/[^"]+)"[^>]*alt="[^"]*video[^"]*"[^>]*>/gi,
    (match, src) => {
      const videoFile = getVideoFile(repo);
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

  // Process regular images
  processedHtml = processedHtml.replace(
    /<img[^>]+src="([^"]+)"[^>]*>/g,
    (match, src) => {
      if (src.startsWith('http')) return match;
      if (src.startsWith('/')) {
        const fullUrl = `https://raw.githubusercontent.com/yuvalm11/${repo}/main${src}`;
        return match.replace(src, fullUrl);
      }
      const fullUrl = `https://raw.githubusercontent.com/yuvalm11/${repo}/main/${src}`;
      return match.replace(src, fullUrl);
    }
  );

  // Process videos
  processedHtml = processedHtml.replace(
    /<video[^>]*src="([^"]+)"[^>]*>/g,
    (match, src) => {
      if (src.startsWith('http')) {
        if (src.includes('github.com/user-attachments/assets/')) {
          const videoFile = getVideoFile(repo);
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