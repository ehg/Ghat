var expect = require( 'chai' ).expect,
    ArrayStore = require( '../../../../client/stores/array' );

describe( 'ArrayStore', function() {
    var store;
    beforeEach(function() {
        store = new ArrayStore();
    });

    describe( 'constructor', function() {
        it( 'should accept an optional initial value', function() {
            expect( store.get() ).to.eql([]);
            store = new ArrayStore([ 1 ]);
            expect( store.get() ).to.eql([ 1 ]);
        });
    });

    describe( '#get()', function() {
        it( 'should return an array of all added values', function() {
            store.add( 1 );
            expect( store.get() ).to.eql([ 1 ]);
        });

        it( 'should return a single value if index specified', function() {
            store.add( 1 );
            expect( store.get( 0 ) ).to.equal( 1 );
        });
    });

    describe( '#find()', function() {
        it( 'should return a value by matching query', function() {
            var value = { a: 1, b: 2 };
            store.add( value );
            expect( store.find({ a: 1 }) ).to.equal( value );
        });
    });

    describe( '#add()', function() {
        it( 'should add a value for future retrieval', function() {
            store.add( 1 );
            expect( store.get() ).to.eql([ 1 ]);
        });

        it( 'should accept an optional index for insertion', function() {
            store.add( 1 );
            store.add( 3 );
            store.add( 2, 1 );
            expect( store.get( 1 ) ).to.equal( 2 );
        });
    });

    describe( '#set()', function() {
        it( 'should replace all values in the store if no index given', function() {
            store.add( 1 );
            store.set([ 2 ]);
            expect( store.get() ).to.eql([ 2 ]);
        });

        it( 'should replace a single value if an index given', function() {
            store.add( 1 );
            store.set( 2, 0 );
            expect( store.get() ).to.eql([ 2 ]);
        });
    });

    describe( '#remove()', function() {
        it( 'should remove a value by index', function() {
            store.add( 1 );
            expect( store.get() ).to.eql([ 1 ]);
            store.remove( 0 );
            expect( store.get() ).to.eql([]);
        });
    });

    describe( '#removeValue()', function() {
        it( 'should remove a value by value', function() {
            store.add( 1 );
            expect( store.get() ).to.eql([ 1 ]);
            store.removeValue( 1 );
            expect( store.get() ).to.eql([]);
        });
    });

    describe( '#findAndRemove()', function() {
        it( 'should remove a value by query', function() {
            store.add({
                a: 1,
                b: 2
            });

            store.findAndRemove({
                a: 1
            });

            expect( store.get() ).to.be.empty;
        });
    });
});
