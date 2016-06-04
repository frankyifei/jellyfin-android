﻿define(['globalize'], function (globalize) {

    function getTabs() {
        return [
        {
            href: 'library.html',
            name: globalize.translate('TabFolders')
        },
         {
             href: 'librarydisplay.html',
             name: globalize.translate('TabDisplay')
         },
         {
             href: 'librarypathmapping.html',
             name: globalize.translate('TabPathSubstitution')
         },
         {
             href: 'librarysettings.html',
             name: globalize.translate('TabAdvanced')
         }];
    }

    return function (view, params) {

        var self = this;

        view.querySelector('form').addEventListener('submit', function (e) {

            Dashboard.showLoadingMsg();

            var form = this;

            ApiClient.getServerConfiguration().then(function (config) {

                config.EnableFolderView = form.querySelector('.chkFolderView').checked;
                ApiClient.updateServerConfiguration(config).then(Dashboard.processServerConfigurationUpdateResult);
            });

            e.preventDefault();
            return false;
        });

        function loadData() {
            ApiClient.getServerConfiguration().then(function (config) {
                view.querySelector('.chkFolderView').checked = config.EnableFolderView;
            });
        }

        view.addEventListener('viewshow', function () {
            LibraryMenu.setTabs('librarysetup', 1, getTabs);
            loadData();
        });
    };
});