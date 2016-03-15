describe('binary-variations', function() {

    it('should compute all possible binary permutations', function() {
        var variations = ['a', 'b', 'c'];
        var permutations = binaryVariations(variations);

        expect(permutations.length).toBe(Math.pow(2, variations.length) - 1);

        variations = ['a', 'b', 'c', 'd'];
        permutations = binaryVariations(variations);

        expect(permutations.length).toBe(Math.pow(2, variations.length) - 1);

        variations = ['a', 'b', 'c', 'd', 'e'];
        permutations = binaryVariations(variations);

        expect(permutations.length).toBe(Math.pow(2, variations.length) - 1);
    });

    describe('filter', function() {

        it('should include single items', function () {
            var variations = ['a', 'b', 'c'];
            var filter = {
                include: ['b']
            };
            var permutations = binaryVariations(variations, filter);

            expect(permutations.length).toBe(1);
            expect(permutations[0]).toBe('b');

            filter = {
                include: ['b', 'c']
            };
            permutations = binaryVariations(variations, filter);

            expect(permutations.length).toBe(2);
            expect(permutations.indexOf('b')).toBeGreaterThan(-1);
            expect(permutations.indexOf('c')).toBeGreaterThan(-1);
        });

        it('should include containing combinations', function () {
            var variations = ['a', 'b', 'c', 'd'];
            var filter = {
                include: [['b', 'd']]
            };
            var permutations = binaryVariations(variations, filter);

            expect(permutations.length).toBeGreaterThan(Math.pow(2, 2) - 1);

            for (var i = 0; i < permutations.length; i++) {
                var permutation = permutations[0];

                expect(permutation.indexOf('b')).toBeGreaterThan(-1);
                expect(permutation.indexOf('d')).toBeGreaterThan(-1);
            }
        });

        it('should exclude single items', function () {
            var variations = ['a', 'b', 'c'];
            var filter = {
                exclude: ['b']
            };
            var permutations = binaryVariations(variations, filter);
            var permutationsLength = Math.pow(2, variations.length) - 1;

            expect(permutations.length).toBe(permutationsLength - 1);

            for (var i = 0; i < permutations.length; i++) {
                var permutation = permutations[0];

                if (permutation.length === 1) {
                    expect(permutations[0]).not.toBe('b');
                }
            }

            filter = {
                exclude: ['b', 'c']
            };
            permutations = binaryVariations(variations, filter);

            expect(permutations.length).toBe(permutationsLength - 2);

            for (var i = 0; i < permutations.length; i++) {
                var permutation = permutations[0];

                if (permutation.length === 1) {
                    expect(permutations[0]).not.toBe('b');
                    expect(permutations[0]).not.toBe('c');
                }
            }
        });
    });

    describe('.expect()', function() {

        it('should return the amount of all ordered, binary permutations [(2^n) - 1]', function() {
            var variations = ['a', 'b', 'c'];

            expect(binaryVariations.expect(variations)).toBe(Math.pow(2, variations.length) - 1);
        });
    });

    describe('.join()', function() {

        var variations = ['a', 'b', 'c'];

        it('should join by default sparator', function() {
            expect(binaryVariations.join(variations)).toBe(variations.join());
        });

        it('should join by given sparator', function() {
            expect(binaryVariations.join(variations, '-')).toBe(variations.join('-'));
        });

        it('should join and add prefix', function() {
            expect(binaryVariations.join(variations, ',', '-')).toBe('-' + variations.join(','));
        });

        it('should join and add suffix', function() {
            expect(binaryVariations.join(variations, ',', '', '-')).toBe(variations.join(',') + '-');
        });

        it('should join and add prefix + suffix', function() {
            expect(binaryVariations.join(variations, ',', '-', '-')).toBe('-' + variations.join(',') + '-');
        });
    });
});