#!/bin/bash
# service.sh, 2015-03-31 / Meetin.gs
#
# Autodeployment script to install, configure and restart the associated
# service. This script can be sourced after the git repository is updated,
# thus all newly created features are already available.

POOL_WAIT=2
POOL_FILE=/var/www/pool

say() {
    echo " *** $@"
}

disable_pool() {
    >$POOL_FILE
    say "Pool taken down, waiting for $POOL_WAIT seconds"
    sleep $POOL_WAIT
}

install_to_var_www() {
    # When listing source directories,
    # do NOT include trailing slash,
    # or rsync(1) will behave badly.
    #
    say "Syncing sites"
    rsync -ptrlq --del \
        mbeta.meetin.gs \
        mdev.meetin.gs \
        mtn.gs \
        m.meetin.gs \
        mobilebeta.meetin.gs \
        mobiledev.meetin.gs \
        mobile.meetin.gs \
        old.meetin.gs \
        platform.meetin.gs \
        platform-dev.meetin.gs \
        track.meetin.gs \
        sites.meetin.gs \
        versions.meetin.gs \
        wb.meetin.gs \
        www.meetin.gs /var/www/

    say "Chownin sites"
    rm -fv /var/www/index.lighttpd.html
    chown -R www-data:www-data /var/www/
}

configure_lighty() {
    rm -f \
        /etc/lighttpd/conf-enabled/40-auth.conf \
        /etc/lighttpd/conf-enabled/42*

    install -m 0644 \
        $DEPLOYDIR/40-auth.conf \
        $DEPLOYDIR/42-mbeta.meetin.gs.conf \
        $DEPLOYDIR/42-mdev.meetin.gs.conf \
        $DEPLOYDIR/42-mtn.gs.conf \
        $DEPLOYDIR/42-m.meetin.gs.conf \
        $DEPLOYDIR/42-mobilebeta.meetin.gs.conf \
        $DEPLOYDIR/42-mobiledev.meetin.gs.conf \
        $DEPLOYDIR/42-mobile.meetin.gs.conf \
        $DEPLOYDIR/42-old.meetin.gs.conf \
        $DEPLOYDIR/42-platform.meetin.gs.conf \
        $DEPLOYDIR/42-platform-dev.meetin.gs.conf \
        $DEPLOYDIR/42-track.meetin.gs.conf \
        $DEPLOYDIR/42-sites.meetin.gs.conf \
        $DEPLOYDIR/42-versions.meetin.gs.conf \
        $DEPLOYDIR/42-wb.meetin.gs.conf \
        $DEPLOYDIR/42-www.meetin.gs.conf /etc/lighttpd/conf-enabled

    install -o www-data -g root -m 600 $DEPLOYDIR/passwd /etc/lighttpd/passwd
    service lighttpd restart
    say "Lighty reconfigured and restarted"
}

enable_pool() {
    git rev-parse HEAD > $POOL_FILE
    chown -c www-data:www-data $POOL_FILE
    chmod 644 $POOL_FILE
    say "Pool set online"
}
