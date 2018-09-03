if has('win32') || has('win64')
  let g:plugged_home = '~/AppData/Local/nvim/plugged'
else
  let g:plugged_home = '~/.vim/plugged'
endif

" Plugins
call plug#begin(g:plugged_home)

  " UI related
  Plug 'chriskempson/base16-vim'
  Plug 'vim-airline/vim-airline'
  Plug 'vim-airline/vim-airline-themes'

  " Better Visual Guide
  Plug 'Yggdroot/indentLine'

  " syntax check
  Plug 'w0rp/ale'

  " Autocomplete
  Plug 'ncm2/ncm2'
  Plug 'roxma/nvim-yarp'

  Plug 'ncm2/ncm2-bufword'
  Plug 'ncm2/ncm2-path'
  Plug 'ncm2/ncm2-jedi', {'for': 'python'}

  " Formater
  Plug 'Chiel92/vim-autoformat'

call plug#end()

filetype plugin indent on

" UI configuration
syntax on
syntax enable

" colorscheme
let base16colorspace=256
try | colorscheme base16-gruvbox-dark-hard | endtry
set background=dark

" True Color Support if it's avaiable in terminal
if has("termguicolors")
    set termguicolors
endif

if has("gui_running")
  set guicursor=n-v-c-sm:block,i-ci-ve:block,r-cr-o:blocks
endif

set number
set relativenumber

set hidden
set mouse=a
set noshowmode
set noshowmatch
set nolazyredraw
set shortmess+=c

" Turn off backup
set nobackup
set noswapfile
set nowritebackup

" Search configuration
set ignorecase                    " ignore case when searching
set smartcase                     " turn on smartcase

" Tab and Indent configuration
set expandtab
set tabstop=4
set shiftwidth=4

" vim-autoformat
noremap <F3> :Autoformat<CR>

" NCM2
augroup NCM2
  autocmd!
  " enable ncm2 for all buffers
  autocmd BufEnter * try | call ncm2#enable_for_buffer() | endtry

  " :help Ncm2PopupOpen for more information
  set completeopt=noinsert,menuone,noselect

  " When the <Enter> key is pressed while the popup menu is visible, it only
  " hides the menu. Use this mapping to close the menu and also start a new line.
  inoremap <expr> <CR> (pumvisible() ? "\<c-y>\<cr>" : "\<CR>")

augroup END

" Ale
if exists(':ALELint') == 2
  let g:ale_lint_on_enter = 0
  let g:ale_lint_on_text_changed = 'never'
  let g:ale_echo_msg_error_str = 'E'
  let g:ale_echo_msg_warning_str = 'W'
  let g:ale_echo_msg_format = '[%linter%] %s [%severity%]'
  let g:ale_linters = {'python': ['flake8']}
endif

" Airline
let g:airline_left_sep  = ''
let g:airline_right_sep = ''
let g:airline#extensions#ale#enabled = 1
let airline#extensions#ale#error_symbol = 'E:'
let airline#extensions#ale#warning_symbol = 'W:'
