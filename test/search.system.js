const chai = require('chai');
const expect = require('expect');
const supertest = require('supertest');

const request = supertest('https://www.etsy.com');

describe('ETSY - Search API', () => {

    it('Search for a product - craft', (done) => {
        request
             .get(`/shop_name_search_service?q=craft`)
             .set('Context-Type', 'application/json')
             .expect('Content-Type', /json/)
             .expect(200)
             .end((err, res) => {
                if (!err) {
                    expect(res).toNotBe(null);
                    expect(err).toBe(null);
                    expect(res.statusCode).toBe(200);
                    expect(res.body.results).toEqual([ 'CraftersCorner', 'CraftyElephant', 'CraftingAddiction' ]);
                    const total_results_count = res.body.total_results_count;
                    console.error('count is: ', total_results_count);
                    console.log(res.body);
                    done();
                } else {
                    console.log(err);
                }
            });
    });

    it('Search for a product - XSS testing', (done) => {
        request
             .get(`/shop_name_search_service?q=craft<script>alert(2)</script>`)
             .set('Context-Type', 'application/json')
             .expect('Content-Type', /json/)
             .expect(200)
             .end((err, res) => {
                if (!err) {
                    expect(res).toNotBe(null);
                    expect(err).toBe(null);
                    expect(res.statusCode).toBe(200);
                    expect(res.body.results).toEqual([]);
                    const total_results_count = res.body.total_results_count;
                    console.error('Total count is: ', total_results_count);
                    console.log(res.body);
                    done();
                } else {
                    console.log(err);
                }
            });
    });

    it('Empty Search', (done) => {
        request
             .get(`/shop_name_search_service?q=""`)
             .set('Context-Type', 'application/json')
             .expect('Content-Type', /json/)
             .expect(200)
             .end((err, res) => {
                if (!err) {
                    expect(res).toNotBe(null);
                    expect(err).toBe(null);
                    expect(res.statusCode).toBe(200);
                    expect(res.body.results).toBe.Empty
                    const total_results_count = res.body.total_results_count;
                    console.error('count is: ', total_results_count);
                    console.log(res.body);
                    done();
                } else {
                    console.log(err);
                }
            });
    });

});

