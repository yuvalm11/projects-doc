# A documentation website for my projects

I used Astro and Cursor to build a website that displays the documentation for my projects by scraping the README files from my GitHub repositories. 

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
3. Build and test: `npm run build`
4. Push changes:
```bash
git add . && git commit -m "Add [project-name] project" && git push
```
5. Optional: Update `markdown.ts` if using multiple videos
