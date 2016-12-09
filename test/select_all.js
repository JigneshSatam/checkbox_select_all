var expect = require("chai").expect

this.jsdom = require('jsdom-global')()
global.$ = global.jQuery = require('jquery');

var select_all = require("../javascript/select_all.js");

describe("Select All", function() {
  describe("Basic Usage", function() {
    beforeEach(function(){
      var parent_checkbox = "<input type='checkbox' id='parent_checkbox'>Select All</input>";
      $(document.body).append(parent_checkbox);

      var childern_checkbox = "<input type='checkbox' class='selectable'>Item1</input>" + "<input type='checkbox' class='selectable'>Item2</input>" + "<input type='checkbox' class='selectable' checked>Item3</input>" + "<input type='checkbox' class='selectable' checked>Item4</input>";
      $(document.body).append(childern_checkbox);
      $("#parent_checkbox").select_all();
    });

    afterEach(function(){
      $(document.body).empty();
    });

    it("adds class select_all on applied checkbox", function() {
      $("#parent_checkbox").select_all();
      expect($("#parent_checkbox").hasClass('select_all')).to.equal(true);
    });

    it("already selected checkboxes", function() {
      expect($(".selectable:checked").length).to.equal(2);
    });

    it("After click parent checkbox all children checkboxes should get selected", function() {
      $('#parent_checkbox').click(function(err){
        if (err) done(err);
        else{
          expect($(".selectable:checked").length).to.equal(4);
          done();
        }
      });
    });

    it("After click any child checkbox parent checkboxes should get unselected", function() {
      $('#parent_checkbox').click(function(err){
        if (err) done(err);
        else{
          $('.selectable').first().click(function(err){
            if (err) done(err);
            else{
              expect($(".selectable:checked").length).to.equal(4);
              done();
            }
          });
        done();
        }
      });
      expect($("#parent_checkbox").is(":checked")).to.equal(false);
    });
  });
});
