/* =================================================================
   TEXOMA BOAT HOUSE — script.js

   One $(document).ready with labeled regions. Every DOM-specific block
   is guarded with a .length check so this file stays safe to load on
   every page. New behaviour → add its own labeled region below.
   ================================================================= */

$(document).ready(function () {

    /* ===== desktop nav / mega-menu code starts here ===== */
    if ($('.tbh-nav-item-mega').length) {
        // .tbh-nav is itself position:absolute, so it would become each
        // panel's containing block (clipping it to the nav's own width)
        // if left nested inside — moving every panel up to be a direct
        // child of .tbh-header lets it span the header's full width instead
        $('.tbh-megamenu').appendTo('.tbh-header');

        // .tbh-nav-panel is a shared marker on every panel (mega or small
        // dropdown alike) so this selects all of them regardless of which
        // one got reparented above
        var $allPanels = $('.tbh-nav-panel');
        var $allTriggers = $('.tbh-nav-mega-trigger');

        function closeAllMega() {
            $allPanels.removeClass('is-open');
            $allTriggers.attr('aria-expanded', 'false');
        }

        // each trigger/panel pair opens and closes independently, matched
        // by the shared data-mega-trigger / data-mega-panel value
        $allTriggers.each(function () {
            var $trigger = $(this);
            var name = $trigger.data('mega-trigger');
            var $panel = $('[data-mega-panel="' + name + '"]');

            $trigger.on('click', function (e) {
                e.preventDefault();
                var opening = !$panel.hasClass('is-open');
                closeAllMega();
                if (opening) {
                    $panel.addClass('is-open');
                    $trigger.attr('aria-expanded', 'true');
                }
            });
        });

        $(document).on('click', function (e) {
            if (!$(e.target).closest('.tbh-nav-item-mega, .tbh-nav-panel').length) {
                closeAllMega();
            }
        });

        $(document).on('keydown', function (e) {
            if (e.key === 'Escape') {
                closeAllMega();
            }
        });

        $(window).on('resize', function () {
            if (window.innerWidth <= 991) { closeAllMega(); }
        });
    }
    /* ===== desktop nav / mega-menu code ends here ===== */


    /* ===== mobile menu code starts here ===== */
    if ($('.tbh-mobileMenu').length) {
        var $mobileMenu = $('.tbh-mobileMenu');
        var $mobileOverlay = $('.tbh-mobileMenu-overlay');

        function openMobileMenu() {
            $mobileMenu.addClass('is-open');
            $mobileOverlay.addClass('is-open');
            $('body').addClass('tbh-noscroll');
        }

        function closeMobileMenu() {
            $mobileMenu.removeClass('is-open');
            $mobileOverlay.removeClass('is-open');
            $('body').removeClass('tbh-noscroll');
        }

        $('.toggleMobileMenu').on('click', function (e) {
            e.stopPropagation();
            openMobileMenu();
        });

        $('.tbh-mobileMenu-close, .tbh-mobileMenu-overlay').on('click', closeMobileMenu);

        // close the drawer after tapping a real destination link
        $mobileMenu.on('click', 'a[href]', function () {
            if ($(this).attr('href') !== 'javascript:void(0)') {
                closeMobileMenu();
            }
        });

        // tidy up if resized back to desktop
        $(window).on('resize', function () {
            if (window.innerWidth > 991) { closeMobileMenu(); }
        });
    }
    /* ===== mobile menu code ends here ===== */


    /* ===== blog category tabs code starts here ===== */
    if ($('.tbh-bl-tab').length) {
        $('.tbh-bl-tab').on('click', function (e) {
            e.preventDefault();
            $('.tbh-bl-tab').removeClass('is-active');
            $(this).addClass('is-active');
        });
    }
    /* ===== blog category tabs code ends here ===== */


    /* ===== employment resume upload code starts here ===== */
    if ($('.tbh-em-upload input[type="file"]').length) {
        $('.tbh-em-upload input[type="file"]').on('change', function () {
            var $sub = $(this).closest('.tbh-em-upload').find('.tbh-em-upload-sub');
            if (this.files && this.files.length) {
                $sub.text(this.files[0].name);
            }
        });
    }
    /* ===== employment resume upload code ends here ===== */


    /* ===== financing faq accordion code starts here ===== */
    if ($('.tbh-ffaq-row').length) {
        // rows ship open, matching the design; the chevron toggles them
        $('.tbh-ffaq-q').on('click', function () {
            $(this).closest('.tbh-ffaq-row').toggleClass('is-open')
                .find('.tbh-ffaq-a').stop(true, true).slideToggle(200);
        });
    }
    /* ===== financing faq accordion code ends here ===== */


    /* ===== faq category tabs code starts here ===== */
    if ($('.tbh-fq-tab').length) {
        $('.tbh-fq-tab').on('click', function () {
            $('.tbh-fq-tab').removeClass('is-active');
            $(this).addClass('is-active');
        });
    }
    /* ===== faq category tabs code ends here ===== */


    /* ===== faq accordion code starts here ===== */
    if ($('.tbh-fq-row').length) {
        $('.tbh-fq-q').on('click', function () {
            var $row = $(this).closest('.tbh-fq-row');
            // decide the direction before the class flips, so the css display
            // rule can never make slideToggle read the wrong current state
            var opening = !$row.hasClass('is-open');
            $row.toggleClass('is-open');
            $row.find('.tbh-fq-a').stop(true, true)[opening ? 'slideDown' : 'slideUp'](200);
        });
    }
    /* ===== faq accordion code ends here ===== */


    /* ===== sell / trade faq accordion code starts here ===== */
    if ($('.tbh-st-faq-row').length) {
        $('.tbh-st-faq-q').on('click', function () {
            var $row = $(this).closest('.tbh-st-faq-row');
            var opening = !$row.hasClass('is-open');
            $row.toggleClass('is-open');
            $row.find('.tbh-st-faq-a').stop(true, true)[opening ? 'slideDown' : 'slideUp'](200);
        });
    }
    /* ===== sell / trade faq accordion code ends here ===== */


    /* ===== payment calculator popup code starts here ===== */
    if ($('.tbh-calc-modal').length) {
        var $calcModal = $('.tbh-calc-modal');
        var $calcOverlay = $('.tbh-calc-overlay');
        var $calcResult = $('#calcResult');

        var calcFields = [
            { id: 'calcPrice', label: 'Boat price' },
            { id: 'calcDown', label: 'Down payment' },
            { id: 'calcTerm', label: 'Term' },
            { id: 'calcRate', label: 'Interest rate' }
        ];

        function clearCalcErrors() {
            $calcModal.find('.field-error').text('');
        }

        function openCalc() {
            $calcModal.addClass('is-open');
            $calcOverlay.addClass('is-open');
            $('body').addClass('tbh-noscroll');
        }

        function closeCalc() {
            $calcModal.removeClass('is-open');
            $calcOverlay.removeClass('is-open');
            $('body').removeClass('tbh-noscroll');
        }

        // reads a field as a number; returns NaN for blank or non-numeric input
        function fieldValue(id) {
            var raw = $.trim($('#' + id).val());
            return raw === '' ? NaN : Number(raw);
        }

        function validateCalc() {
            clearCalcErrors();
            var values = {};
            var valid = true;

            calcFields.forEach(function (field) {
                var value = fieldValue(field.id);
                if (isNaN(value)) {
                    $('#error_' + field.id).text(field.label + ' is required.');
                    valid = false;
                } else if (value < 0) {
                    $('#error_' + field.id).text(field.label + ' cannot be negative.');
                    valid = false;
                }
                values[field.id] = value;
            });

            if (!valid) { return null; }

            if (values.calcDown >= values.calcPrice) {
                $('#error_calcDown').text('Down payment must be less than the boat price.');
                return null;
            }

            return values;
        }

        function monthlyPayment(principal, annualRate, months) {
            var monthlyRate = annualRate / 100 / 12;
            // a 0% loan is a plain split of the principal — the amortisation
            // formula divides by zero there
            if (monthlyRate === 0) {
                return principal / months;
            }
            var growth = Math.pow(1 + monthlyRate, months);
            return principal * monthlyRate * growth / (growth - 1);
        }

        $('.tbh-calc-open').on('click', function (e) {
            e.preventDefault();
            openCalc();
        });

        $('.tbh-calc-close, .tbh-calc-overlay').on('click', closeCalc);

        $(document).on('keydown', function (e) {
            if (e.key === 'Escape' && $calcModal.hasClass('is-open')) {
                closeCalc();
            }
        });

        $('#payment_calculator_form').on('submit', function (e) {
            e.preventDefault();

            var values = validateCalc();
            if (!values) {
                $calcResult.removeClass('is-open');
                return;
            }

            var payment = monthlyPayment(
                values.calcPrice - values.calcDown,
                values.calcRate,
                values.calcTerm
            );

            $('#calcMonthly').text('$' + payment.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }));
            $calcResult.addClass('is-open');
        });

        // a stale result would contradict the edited field still on screen
        $('#payment_calculator_form').on('input change', '.require_check', function () {
            $calcResult.removeClass('is-open');
        });
    }
    /* ===== payment calculator popup code ends here ===== */


    /* ===== carousels code starts here ===== */
    /* Every slider is Owl Carousel 2 and every init is .length-guarded:

       if ($('.tbh-xxx-slider').length) {
           $('.tbh-xxx-slider').owlCarousel({ ... });
       }
    */

    /* ===== carousels code ends here ===== */

});
