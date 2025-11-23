# A documentation website for my projects

I used Astro and Cursor to build a website that displays the documentation for my projects by scraping the README files from my GitHub repositories.

Every time I tried to build a documentation website for my projects, I ended up spending too much time on the design and formatting for each project, making it practically impossible to maintain.

The cool thing about this website is that it automatically parses the README files and displays the content in a nice way with support for images, videos, math equations, etc. It makes the whole process of creating and maintaining documentation for my projects much easier and efficient.

I also added a daily rebuild workflow that checks for changes in my project repositories and rebuilds the website if there are any changes. There's also an easy build and deploy workflows that are triggered on every push to main or manually.

## To add a new project:

1. Add entry to `src/config/projects.ts` with
```ts
{
  name: 'Project Name',
  description: 'Project Description',
  repo: 'project-repo',
  tags: ['tag1', 'tag2'],
  githubUrl: 'https://github.com/your-username/project-repo'
}
```
2. Ensure the repo has a `README.md` on main branch
3. Build and test: `npm run build`, `npm run dev`
4. Push changes:
```bash
git add . && git commit -m "Add [project-name] project" && git push
```
5. Optional: Update `markdown.ts` if using multiple videos
