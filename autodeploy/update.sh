#!/bin/bash

. $DEPLOYDIR/githupdate.sh

git_upgrade && [ "$FORCE" != "yes" ] && {
    say Version has not changed, exiting
    exit 0
}

. $DEPLOYDIR/service.sh

disable_pool
install_to_var_www
configure_lighty
enable_pool

say Githupdate ready
