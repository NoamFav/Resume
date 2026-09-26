# 📄 Resume

<div align="center">

<img src="https://img.shields.io/badge/react-18-61DAFB.svg?style=for-the-badge&logo=react&logoColor=white" alt="React">
<img src="https://img.shields.io/badge/vite-6-646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
<img src="https://img.shields.io/badge/pnpm-12-F69220.svg?style=for-the-badge&logo=pnpm&logoColor=white" alt="pnpm">
<img src="https://img.shields.io/badge/license-MIT-green.svg?style=for-the-badge" alt="License">

**Interactive personal resume website**

[noamfav.github.io/Resume](https://noamfav.github.io/Resume/) · [Setup](#setup) · [How it's put together](#how-its-put-together)

</div>

---

A résumé you can drive like a terminal. Same design language as
[nf-software.com](https://nf-software.com), pushed further: a boot log, a working
shell, htop meters, git-log history, and live ASCII-rendered 3D objects.

---

## Setup

```bash
pnpm install
pnpm run dev      # dev server
pnpm run build    # production build into dist/
pnpm run deploy   # build, then publish dist/ to gh-pages
```

---

## How it's put together

| Where | What |
| --- | --- |
| `public/data/*.json` | All the content: experience, education, projects, skills, languages, frameworks, tools, contact |
| `public/data/profile.json` | What only the CV needs: summary, spoken languages, which projects make the one page |
| `cv/` | The PDF résumé: `nfcv.cls` (the terminal look as a LaTeX class), `build.mjs` (writes `resume.tex`, `resume-anon.tex` and `RESUME.md` from the JSON), bundled fonts |
| `public/resume.pdf` | The PDF behind `wget resume.pdf`, from `pnpm run build:cv` (needs XeLaTeX) |
| `src/shell/` | tmux window list, vim statusline, `:` command line, help, boot log, footer, colorschemes |
| `src/term/` | The shell on the home page and its commands |
| `src/ascii/` | The GPU ASCII renderer, shared with NF Software, plus two scenes of its own (`code`, `stack`) |
| `src/ui/` | Panes, meters, htop tables, figlet, neofetch, filters |

Keys: `1`–`6` pages · `:` or `⌘K` command line · `/` search · `d` download the PDF ·
`t` colorscheme · `?` everything else.

---

## License

MIT — see [LICENSE](LICENSE).

---

<div align="center">
Made with ❤️ by <a href="https://github.com/NoamFav">NoamFav</a>
</div>
