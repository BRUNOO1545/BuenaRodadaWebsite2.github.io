//#region startup

    let pageStarted = false;

    function pageStartup() {
        let pageStartupDiv = document.getElementById("pageStartupDiv");
        let pageThemeIcon = document.getElementById("navColorSchemeChanger");

        pageStarted = true;
        navHamburgerInstantCollapse();
        navApplyColorScheme(colorSchemeData.load());
        pageStartupDiv.classList = "startup-div startup-loaded";
        pageThemeIcon.style.animation = "nav-theme-show 0.8s forwards ease";
    }

//#endregion

//#region Nav and Hamburger
    
    // Vars
    const colorSchemeData = {
        save: function(scheme) {
            localStorage.setItem("colorScheme", parseInt(scheme));
        },
        load: function() {
            let val = localStorage.getItem("colorScheme");
            
            return (val === null) ? 0 : parseInt(val);
        }
    }
    let navHamburgerOpen = false;
    let navColorSchemeOption = colorSchemeData.load();

    // Check close
    function navHamburgerInteract() {
        let navMobile = document.getElementById("navMobileOptions");
        let navHamburgerIcon = document.getElementById("navHamburgerIcon");
        
        if (navHamburgerOpen === false) {
            navHamburgerOpen = true;
            navMobile.style.animation = "nav-options-mobile-hide 0.3s forwards";
            navHamburgerIcon.src = "./assets/page/hamburger.svg";
        } else {
            navHamburgerOpen = false;
            navMobile.style.animation = "nav-options-mobile-show 0.3s forwards";
            navHamburgerIcon.src = "./assets/page/hamburger_close.svg";
        }
    }
    
    // Instant collapse
    function navHamburgerInstantCollapse() {
        let navMobile = document.getElementById("navMobileOptions");
        let navHamburgerIcon = document.getElementById("navHamburgerIcon");
        
        navHamburgerOpen = true;
        navMobile.style.animation = "nav-options-mobile-hide 0s forwards";
        navHamburgerIcon.src = "./assets/page/hamburger.svg";
    }

    // Force close
    function navHamburgerCollapse() {
        navHamburgerOpen = false;
        navHamburgerInteract();
    }

    // Auto close nav
    let viewWidth = window.matchMedia("(max-width: 780px)");

    viewWidth.addEventListener("change", function() {
        navHamburgerCollapse();
    });

    // Apply color scheme
    function navApplyColorScheme(scheme) {
        let navColorSchemeChanger = document.getElementById("navColorSchemeChanger");
        let svgClass = document.getElementsByClassName("svg-color");
        let root = document.documentElement;

        Array.from(svgClass).forEach(e => {
            switch(scheme) {
                // Dark theme
                case 1:
                    navColorSchemeChanger.src = "./assets/page/mode_dark.svg";
                    root.style = "color-scheme: dark;"
                    e.classList = "svg-color svg-not-inverted";
                break;

                // Light theme
                case 2:
                    navColorSchemeChanger.src = "./assets/page/mode_light.svg";
                    root.style = "color-scheme: light;"
                    e.classList = "svg-color svg-inverted";
                break;

                // System theme
                default:
                    navColorSchemeChanger.src = "./assets/page/mode_auto.svg";
                    root.style = "color-scheme: light dark;"
                    e.classList = "svg-color";
                break;
            }
        });
    }

    // Change color scheme
    function navChangeColorScheme() {
        if (navColorSchemeOption < 2) {
            navColorSchemeOption += 1;
        } else {
            navColorSchemeOption = 0;
        }

        colorSchemeData.save(navColorSchemeOption);
        navApplyColorScheme(navColorSchemeOption);
    }

//#endregion