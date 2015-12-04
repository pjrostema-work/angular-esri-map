describe('EsriLayerControllerBase', function() {
    var scope,
        controller,
        doNothingFunction;

    beforeEach(module('esri.map'));

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        // mockDataSvc = dataSvc;
        // spyOn(mockDataSvc, 'save').andCallThrough();
        controller = $controller('EsriLayerControllerBase', {
            // $attrs: {}
            // $scope: scope
            // dataSvc: mockDataSvc
        });
        doNothingFunction = function() {
            return;
        };
    }));

    describe('getLayerOptions', function() {
        beforeEach(function() {
            controller.layerOptions = doNothingFunction;
        });

        it('should return a layerOptions object', function() {
            expect(controller.getLayerOptions()).toBeDefined();
        });

        it('should return a layerOptions object and set the visible property from a boolean', function() {
            controller.visible = true;
            expect(controller.getLayerOptions()).toBeDefined();
        });

        it('should return a layerOptions object and set the visible property from a string', function() {
            controller.visible = 'true';
            expect(controller.getLayerOptions()).toBeDefined();
        });

        it('should return a layerOptions object and set the opacity property', function() {
            controller.opacity = 0.5;
            expect(controller.getLayerOptions()).toBeDefined();
        });
    });

    describe('getLayerInfo', function() {
        var layer,
            attrs;

        beforeEach(function() {
            layer = {
                name: 'layerName'
            };
            attrs = {};
        });

        it('should return a layerInfo object', function() {
            expect(controller.getLayerInfo(layer, attrs)).toBeDefined();
        });

        it('should return a layerInfo object', function() {
            attrs.hideLayers = '1,2';
            attrs.defaultSymbol = '{}';
            expect(controller.getLayerInfo(layer, attrs)).toBeDefined();
        });
    });

    describe('_bindLayerEvents', function() {
        var attrs,
            layer,
            mapController;

        beforeEach(function() {
            attrs = {};
            layer = {
                name: 'layerName',
                on: doNothingFunction
            };
            mapController = {
                removeLayer: doNothingFunction
            };
            scope.layerCtrl = {
                load: doNothingFunction,
                updateEnd: doNothingFunction
            };
        });
        
        it('should call load handler if available in attrs and the layer is loaded', function() {
            attrs.load = doNothingFunction;
            layer.loaded = true;
            var spy = spyOn(scope.layerCtrl, 'load');
            controller._bindLayerEvents(scope, attrs, layer, mapController);
            expect(spy).toHaveBeenCalled();
        });

        it('should call updateEnd handler if available in attrs', function() {
            attrs.updateEnd = doNothingFunction;
            var spy = spyOn(layer, 'on');
            controller._bindLayerEvents(scope, attrs, layer, mapController);
            expect(spy).toHaveBeenCalled();
        });

        it('should remove a layer when scope is destroyed', function() {
            var spy = spyOn(mapController, 'removeLayer');
            controller._bindLayerEvents(scope, attrs, layer, mapController);
            scope.$broadcast('$destroy');
            expect(spy).toHaveBeenCalled();
        });
    });
});
