% nfcv.cls — a terminal-style CV, the print twin of noamfav.github.io/Resume.
%
% Compile with XeLaTeX from this directory; fonts load from ./fonts.
%
%   \documentclass{nfcv}
%   \cvscheme{night}                   colorschemes: paper (default, print), night, amber
%
% Every page gets a tmux window list on top and a vim statusline at the bottom:
%
%   \cvwindows{resume}{experience,projects,skills,education}
%       first argument is the active window, the list links to \cvsection titles
%   \cvbrand{noam}{favier}             user@host in the top bar
%   \cvstatus{~/resume.pdf}{open for work}
%
% Building blocks:
%
%   \prompt{cmd}                       $ cmd
%   \begin{cvbanner}[size]             figlet banner: █ solid, box-drawing shadow
%     \bannerline[color]{row}         a . is a blank cell
%   \end{cvbanner}
%   \cvsection[aside]{01}{title}       01 title ─────────────── aside
%   \begin{cvfetch}[key width]         neofetch readout
%     \fetch{key}{value}
%   \end{cvfetch}
%   \commit[refs]{sha}{dates}{role}{org}{body}     one git log entry
%   \entry{name}{meta}{body}           a listing row: name/  meta, then text
%   \meter[label width]{label}{pct}    htop meter  [|||||||||      90%]
%   \begin{pane}[right]{title} … \end{pane}        box with its title in the border
%   \tag{text}   \code{text}   \swatches
%   {\serif …}                         Source Serif 4, for prose
\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{nfcv}[2026/09/25 v1.0 terminal-style CV]

\def\nfcv@scheme{paper}
\DeclareOption*{\PassOptionsToClass{\CurrentOption}{article}}
\ProcessOptions\relax
\LoadClass[a4paper]{article}

\RequirePackage{fontspec}
\RequirePackage{xcolor}
\RequirePackage[a4paper,top=12mm,bottom=8mm,left=12mm,right=12mm]{geometry}
\RequirePackage[most]{tcolorbox}
\RequirePackage{paracol}
\RequirePackage{refcount}
\RequirePackage{hyperref}

% ── fonts ────────────────────────────────────────────────────────────────
% Victor Mono everywhere (its italic is a cursive, the accent voice), Source
% Serif 4 for prose.
\defaultfontfeatures{Path=fonts/, Extension=.ttf}
\setmainfont{VictorMono}[
    UprightFont=*-Regular, ItalicFont=*-Italic,
    BoldFont=*-Bold, BoldItalicFont=*-BoldItalic]
\setmonofont{VictorMono}[
    UprightFont=*-Regular, ItalicFont=*-Italic,
    BoldFont=*-Bold, BoldItalicFont=*-BoldItalic]
\newfontfamily\serif{SourceSerif4}[UprightFont=*-Regular, ItalicFont=*-Italic]

% ── colorschemes (the same values as the site's index.css) ─────────────────
\def\nfcv@set#1#2{\definecolor{nf-#1}{RGB}{#2}}
\def\nfcv@scheme@paper{%
    \nfcv@set{bg}{243,240,232}\nfcv@set{surface}{236,232,222}\nfcv@set{raise}{250,248,243}%
    \nfcv@set{line}{212,206,193}\nfcv@set{fg}{27,27,25}\nfcv@set{muted}{104,100,93}%
    \nfcv@set{dim}{160,155,145}\nfcv@set{accent}{52,104,16}\nfcv@set{ink}{243,240,232}%
    \nfcv@set{warn}{166,104,0}\nfcv@set{err}{180,50,40}}
\def\nfcv@scheme@night{%
    \nfcv@set{bg}{10,11,13}\nfcv@set{surface}{16,18,21}\nfcv@set{raise}{24,27,31}%
    \nfcv@set{line}{40,44,50}\nfcv@set{fg}{234,231,224}\nfcv@set{muted}{142,146,153}%
    \nfcv@set{dim}{86,90,98}\nfcv@set{accent}{197,242,105}\nfcv@set{ink}{13,15,8}%
    \nfcv@set{warn}{242,191,92}\nfcv@set{err}{240,113,103}}
\def\nfcv@scheme@amber{%
    \nfcv@set{bg}{15,10,4}\nfcv@set{surface}{22,16,7}\nfcv@set{raise}{31,22,10}%
    \nfcv@set{line}{63,46,19}\nfcv@set{fg}{255,192,100}\nfcv@set{muted}{196,140,62}%
    \nfcv@set{dim}{118,84,36}\nfcv@set{accent}{255,222,140}\nfcv@set{ink}{15,10,4}%
    \nfcv@set{warn}{255,160,80}\nfcv@set{err}{255,110,80}}
\newcommand\cvscheme[1]{\def\nfcv@scheme{#1}\csname nfcv@scheme@#1\endcsname\pagecolor{nf-bg}}
\cvscheme{paper}

\hypersetup{colorlinks=true, linkcolor=nf-fg, urlcolor=nf-fg, pdfborder={0 0 0}}

% ── type ─────────────────────────────────────────────────────────────────
\renewcommand\normalsize{\fontsize{8pt}{10.6pt}\selectfont}
\renewcommand\small{\fontsize{7.4pt}{9.8pt}\selectfont}
\renewcommand\footnotesize{\fontsize{6.8pt}{9pt}\selectfont}
\renewcommand\large{\fontsize{10.5pt}{13pt}\selectfont}
\renewcommand\Large{\fontsize{13pt}{16pt}\selectfont}
\setlength\parindent{0pt}
\setlength\parskip{0pt}
\setlength\fboxsep{1.3pt}
\pagestyle{empty}
\AtBeginDocument{\normalsize\color{nf-fg}\raggedright}

% One monospace cell, for anything that counts in characters
\newlength\nfcv@cw
\AtBeginDocument{\settowidth\nfcv@cw{\normalfont 0}}

% ── page chrome: tmux on top, vim statusline at the bottom ────────────────
\def\nfcv@user{noam}\def\nfcv@host{favier}
\def\nfcv@active{resume}\def\nfcv@windows{}
\def\nfcv@file{~/resume.pdf}\def\nfcv@message{}
\newcommand\cvbrand[2]{\def\nfcv@user{#1}\def\nfcv@host{#2}}
\newcommand\cvwindows[2]{\def\nfcv@active{#1}\def\nfcv@windows{#2}}
\newcommand\cvstatus[2]{\def\nfcv@file{#1}\def\nfcv@message{#2}}

\newcounter{nfcv@win}
\def\nfcv@window#1{%
    \stepcounter{nfcv@win}%
    \hspace{0.9em}\hyperlink{sec:#1}{\textcolor{nf-dim}{\arabic{nfcv@win}:}\textcolor{nf-muted}{#1}}}
\def\nfcv@tmux{%
    \setcounter{nfcv@win}{1}%
    {\bfseries\textcolor{nf-accent}{\nfcv@user}\textcolor{nf-dim}{@}\textcolor{nf-fg}{\nfcv@host}\textcolor{nf-accent}{▋}}%
    \hspace{1.4em}%
    \colorbox{nf-accent}{\textcolor{nf-ink}{\bfseries 1:\nfcv@active*}}%
    \@for\nfcv@w:=\nfcv@windows\do{\expandafter\nfcv@window\expandafter{\nfcv@w}}%
    \hfill\textcolor{nf-accent}{◐}\,\textcolor{nf-muted}{\nfcv@scheme}}

% A statusline segment: coloured block, text vertically centred in 5mm
\def\nfcv@seg#1#2#3{%
    {\setlength\fboxsep{0pt}\colorbox{#1}{%
        \hspace{2mm}\rule[-1.7mm]{0pt}{5mm}\textcolor{#2}{#3}\hspace{2mm}}}}
\def\nfcv@last{\getpagerefnumber{nfcv@last}}
\def\nfcv@pos{%
    \ifnum\nfcv@last<2 All\else
        \ifnum\value{page}=1 Top\else
            \ifnum\value{page}=\nfcv@last\relax Bot\else
                \the\numexpr 100*\value{page}/\nfcv@last\relax\%\fi\fi\fi}
\def\nfcv@statusline{%
    \rlap{\textcolor{nf-surface}{\rule[-1.7mm]{\paperwidth}{5mm}}}%
    \makebox[\paperwidth][l]{\footnotesize
        \nfcv@seg{nf-accent}{nf-ink}{\bfseries NORMAL}%
        \nfcv@seg{nf-raise}{nf-fg}{\nfcv@file}%
        \nfcv@seg{nf-surface}{nf-muted}{\textcolor{nf-accent}{●}\ \nfcv@message}%
        \hfill
        \nfcv@seg{nf-surface}{nf-dim}{utf-8}%
        \nfcv@seg{nf-surface}{nf-muted}{\thepage/\nfcv@last}%
        \nfcv@seg{nf-raise}{nf-fg}{\makebox[2.2em][c]{\nfcv@pos}}}}

\AddToHook{shipout/background}{%
    \put(0,-6.2mm){\textcolor{nf-line}{\rule{\paperwidth}{0.3pt}}}%
    \put(12mm,-4.1mm){\makebox[\dimexpr\paperwidth-24mm][l]{\small\nfcv@tmux}}%
    \put(0,\dimexpr-\paperheight+1.7mm){\nfcv@statusline}}
\AtEndDocument{\label{nfcv@last}}

% ── building blocks ──────────────────────────────────────────────────────
\newcommand\prompt[1]{{\textcolor{nf-accent}{\$}\ \textcolor{nf-dim}{#1}}}
\newcommand\code[1]{{\setlength\fboxsep{0.8pt}\colorbox{nf-raise}{\textcolor{nf-fg}{#1}}}}
\DeclareRobustCommand\tag[1]{{\setlength\fboxsep{1.1pt}\fcolorbox{nf-line}{nf-bg}{\footnotesize\textcolor{nf-muted}{#1}}}}
\newcommand\swatches{{\setlength\fboxsep{0pt}%
    \@for\nfcv@c:=fg,muted,dim,line,accent,warn,err,raise\do{%
        \colorbox{nf-\nfcv@c}{\rule{1.5em}{0pt}\rule{0pt}{0.8em}}}}}

% "01 title ──────────────── aside", and a link target for the tmux bar
\NewDocumentCommand\cvsection{ O{} m m }{%
    \par\addvspace{7pt}%
    \hypertarget{sec:#3}{}%
    \makebox[\linewidth][l]{\small\textcolor{nf-accent}{#2}\hspace{0.7em}%
        \textcolor{nf-fg}{\bfseries #3}\hspace{0.7em}%
        \textcolor{nf-line}{\leaders\hrule height 2.9pt depth -2.6pt\hfill}%
        \if\relax\detokenize{#1}\relax\else\hspace{0.7em}\textcolor{nf-dim}{#1}\fi}%
    \par\nobreak\vspace{5pt}}

\newenvironment{cvfetch}[1][4.6em]{%
    \def\fetch##1##2{\par\noindent\makebox[#1][l]{\textcolor{nf-accent}{##1}}%
        \parbox[t]{\dimexpr\linewidth-#1}{\raggedright ##2}}}%
    {\par}

% git log: `*` and a graph line down the left, then the commit
\tcbset{nfcv commit/.style={enhanced, blank, left=1.5em, bottom=3pt,
    before skip=0pt, after skip=0pt,
    overlay={%
        \node[anchor=north west, inner sep=0pt, text=nf-accent] at (frame.north west) {*};
        \draw[nf-dim, line width=0.4pt]
            ([xshift=0.27em, yshift=-1.05em]frame.north west) -- ([xshift=0.27em]frame.south west);}}}
\NewDocumentCommand\commit{ O{} m m m m +m }{%
    \begin{tcolorbox}[nfcv commit]
        \textcolor{nf-warn}{commit #2}%
        \if\relax\detokenize{#1}\relax\else\textcolor{nf-accent}{\ (#1)}\fi\par
        \textcolor{nf-muted}{Date:\ \ #3}\par\vspace{2pt}
        {\raggedright\leftskip=1.4em
        {\bfseries #4}\textcolor{nf-muted}{\ @ #5}\par
        {\color{nf-muted}#6}\par}
    \end{tcolorbox}}

% A listing row: bold name in the accent, dim metadata, text underneath
\newcommand\entry[3]{%
    \par\addvspace{2.5pt}%
    {\bfseries\textcolor{nf-accent}{#1}}\hspace{0.6em}\textcolor{nf-muted}{#2}\par
    {\leftskip=1.4em\textcolor{nf-muted}{#3}\par}}

% htop meter: the bars are real characters, as many as fit the column
\ExplSyntaxOn
\int_new:N \l__nfcv_cells_int
\int_new:N \l__nfcv_fill_int
\NewDocumentCommand \meter { O{5.6em} m m }
  {
    \par\noindent
    \makebox[#1][l]{#2}
    \int_set:Nn \l__nfcv_cells_int
      {
        \int_div_truncate:nn
          { \dim_to_decimal_in_sp:n { \linewidth - #1 - 7 \nfcv@cw } }
          { \dim_to_decimal_in_sp:n { \nfcv@cw } }
      }
    \int_set:Nn \l__nfcv_fill_int { \int_div_round:nn { #3 * \l__nfcv_cells_int } { 100 } }
    \textcolor{nf-fg}{[}
    \textcolor{nf-accent}{ \prg_replicate:nn { \l__nfcv_fill_int } { | } }
    \hspace*{ \dim_eval:n { \nfcv@cw * (\l__nfcv_cells_int - \l__nfcv_fill_int) } }
    \makebox[5\nfcv@cw][r]{ \textcolor{nf-muted}{#3\%} }
    \textcolor{nf-fg}{]}
    \par
  }

% figlet banner: each █ in the solid colour, everything else is shadow
\NewDocumentCommand \bannerline { O{nf-fg} m }
  {
    \hbox:n { \str_map_inline:nn {#2} { \__nfcv_banner:nn {#1} {##1} } }
  }
\cs_new:Npn \__nfcv_banner:nn #1#2
  {
    \str_if_eq:nnTF {#2} { █ }
      { \textcolor{#1}{█} }
      { \str_if_eq:nnTF {#2} { . } { \hspace*{\nfcv@cw} } { \textcolor{nf-dim}{#2} } }
  }
\ExplSyntaxOff
\newenvironment{cvbanner}[1][10pt]{%
    \par\begingroup\fontsize{#1}{1.17\dimexpr#1\relax}\selectfont
    \settowidth\nfcv@cw{0}\lineskiplimit=-\maxdimen\baselineskip=1.17\dimexpr#1\relax}%
    {\par\endgroup\settowidth\nfcv@cw{\normalfont 0}}

% A pane: bordered box, title set into the top border (btop style)
\tcbset{nfcv right/.code={\if\relax\detokenize{#1}\relax\else
    \pgfkeysalso{overlay={\node[anchor=east, fill=nf-bg, inner xsep=2pt, inner ysep=0pt,
        text=nf-dim, font=\footnotesize] at ([xshift=-6pt]frame.north east) {#1};}}\fi}}
\NewDocumentEnvironment{pane}{ O{} m }{%
    \begin{tcolorbox}[enhanced, colback=nf-bg, colframe=nf-line, boxrule=0.4pt, arc=1.2pt,
        left=6pt, right=6pt, top=6pt, bottom=5pt, before skip=6pt, after skip=6pt,
        attach boxed title to top left={xshift=6pt, yshift=-3.4pt},
        boxed title style={colback=nf-bg, colframe=nf-bg, boxrule=0pt, arc=0pt,
            left=2pt, right=2pt, top=0pt, bottom=0pt},
        coltitle=nf-muted, fonttitle=\footnotesize, title={#2}, nfcv right={#1}]}%
    {\end{tcolorbox}}

\endinput
