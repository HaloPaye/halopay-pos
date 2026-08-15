@echo off
set FILTER_BRANCH_SQUELCH_WARNING=1
git filter-branch -f --msg-filter "sed -e \"/Claude/d\" -e \"/mallison031/d\" -e \"/muyideenallison@gmail.com/d\"" -- --all
