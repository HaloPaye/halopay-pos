@echo off
set FILTER_BRANCH_SQUELCH_WARNING=1
git filter-branch -f --env-filter "if test \"$GIT_AUTHOR_EMAIL\" = \"muyideenallison@gmail.com\"; then export GIT_AUTHOR_NAME=\"dillon ofili\"; export GIT_AUTHOR_EMAIL=\"dillonofili667@gmail.com\"; fi" -- --all
