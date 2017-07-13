/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has defined URL', function() {
            // loop through allFeeds
            allFeeds.forEach(function(feed) {
                // make sure they are defined
                expect(feed.url).toBeDefined();
                // make sure they are not empty
                expect(feed.url).not.toBe('');
            });
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has a name', function() {
            // loop through allFeeds
            allFeeds.forEach(function(feed) {
                // make sure they are defined
                expect(feed.name).toBeDefined();
                // make sure they are not empty
                expect(feed.name).not.toBe('');
            });
        });
    });
    
    
    
    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        
        // defined variables
        var body, menu;
        
        beforeEach(function () {
            // selected elements from the DOM
            body = document.body;
            menu = $('.menu-icon-link');
        });
        
        it('is hidden by default', function() {
            // validate that the class name is menu-hidden
            expect(body.className).toMatch('menu-hidden');
        });
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('toggles properly', function() {
            // it's hidden by default, so when clicking for the first time
            // it shouldn't has the class 'menu-hidden'
            menu.click();
            expect(body.className).not.toMatch('menu-hidden');
            // when clicking for the 2nd time it should has it
            menu.click();
            expect(body.className).toMatch('menu-hidden');
        });
        
    });




    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        
        // required for the async call
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });
        
        // check there's at least a single entry in the feed container
        it('contains at least 1 entry', function(done) {
            // select all elements with the class entry
            var entries = $('.entry').length;
            // check if they are more than 0 elements
            expect(entries).toBeGreaterThan(0);
            done();
        });
    });
    
    
    
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var feed;
        // required for the async call
        beforeEach(function(done) {
            loadFeed(0, function() {
                // get the html of the feed on loading the page
                feed = $('.feed').html();
                
                loadFeed(1, function() {
                    done();
                });
            });
        });
        
        // make sure the feed is changed (content has been added)
        it('changes the loaded content', function(done) {
            // get the feed after load
            var newFeed = $('.feed').html();
            // comparing them they shouldn't match
            expect(newFeed).not.toBe(feed);
            done();
        });
    });

}());
