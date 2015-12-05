describe('EsriMapController', function() {
    // var scope;
    var doNothingFunction = function() {
        return;
    };
    var controller;
    var $attrs = {};
    var esriMapUtils = {};
    var esriRegistry = {
        _register: doNothingFunction
    };

    beforeEach(module('esri.map'));

    beforeEach(inject(function($rootScope, $controller) {
        // scope = $rootScope.$new();

        controller = $controller('EsriMapController', {
            $attrs: $attrs,
            // $timeout: $timeout,
            esriMapUtils: esriMapUtils,
            esriRegistry: esriRegistry
        });

        // NOTE: need to find a way to successfully mock this.mapOptions as a function
        controller.mapOptions = doNothingFunction;
    }));

    describe('immediately run functions', function() {
        it('should call getMapOptions', function() {
            $attrs.webmapId = 'abc123';

            var spy = spyOn(controller, 'getMapOptions');
            expect(spy).toHaveBeenCalled();
        });

        it('should call getMapOptions', function() {
            var spy = spyOn(controller, 'getMapOptions');
            expect(spy).toHaveBeenCalled();
        });

        it('should call esriRegistry._register', function() {
            $attrs.registerAs = 'registerId';

            var spy = spyOn(esriRegistry, '_register');
            expect(spy).toHaveBeenCalled();
        });
    });
});
