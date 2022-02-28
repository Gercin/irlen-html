import "parsleyjs";

$(function () {
    filter();
    showMore();
    snippetSlider();
});

function snippetSlider() {
    $(document).ready(function () {
      let slider = $(document).find('[data-type=slider-block]');
  
      $(document).find('[data-type=slider-block-inner]').html(slider);
    });
  }

function filter() {
    $(document).on("click", "[data-type=js-filter]", function (e) {
        e.preventDefault();

        let thisObj = $(this),
            id = thisObj.attr("data-id");

        console.log("filter " + id);


        $.ajax({
            method: "POST",
            url: window.location.href,
            data: {
                ajax: 1,
                id: id,
            },
            success: function (r) {
                $(document).find('[data-type=items-container-full]').empty();
                $(document).find('[data-type=items-container-full]').append($(r));
            }
        });
    });
}

function showMore() {
    $(document).on("click", "[data-type=show_more_click]", function (e) {
        let thisObj = $(this),
            url = thisObj.attr("data-url"),
            types = thisObj.attr("data-types"),
            container = thisObj.siblings("[data-type=items-container]");

        console.log("show more");

        if (types) {
            types = JSON.parse(types);
        }

        if (url) {
            $(document).find('[data-type=show_more_click_block]').remove();

            $.ajax({
                method: "POST",
                url: url,
                data: {
                    ajax: 1,
                    types: types,
                },
            }).done(function (r) {
                let responsePageNav = $(r).find("[data-type=show_more_click_block]"),
                    itemsResponse = $(r).find("[data-type=item]");

                $(document).find('[data-type=items-container]').append($(itemsResponse));

                if (responsePageNav) {
                    container.after(responsePageNav);
                }

            });
        }
    });
}
