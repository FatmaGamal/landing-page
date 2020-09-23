/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/
let documentContentLoaded = false;
let navContainer;
let sections;
let links;

/**
 * End Global Variables
 * Start Helper Functions
 *
*/
/**
* @description get active section
*/
const getActiveSection = () => {
    for (const section of sections) {
        const RECT = section.getBoundingClientRect(); // get rects(width, height, top, etc)
        let top = RECT.top + (RECT.height * 0.85);
        if (top >= 0) {
            return section
        }
    }
    return null;
}

/**
* @description check for new sections every 10 seconds
*/
const checkDOMChange = () => {
    let updatedSections = document.querySelectorAll('section');
    if (updatedSections.length != sections.length) {
        sections = updatedSections;
    }
    setTimeout(checkDOMChange, 15000);
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

/**
* @description scroll to specific action
* @param {string} sectionId - id of section to scroll to
*/
const scrollTo = (sectionId) => {

    const EL = document.querySelector(`#${sectionId}`);

    window.scroll({
        top: EL.offsetTop,  //scroll to top of section
        behavior: 'smooth' // smooth scroll
    });

    setActiveSectionStyle(EL);
}

/**
* @description reset currently selected section and link and set style of active section and link
* @param {HTMLElement} activeSection - active section to highlight
*/
const setActiveSectionStyle = (activeSection) => {
    for (const section of sections) {
        // remove highlight from all sections
        section.classList.remove('active');
    }
    // highlight visible section
    activeSection.classList.add('active');
    for (const link of links) {
        // remove highlight from all links
        link.classList.remove('active');
    }
    // highlight link of visible section
    document.querySelector('li[data-id="#' + activeSection.id + '"]').classList.add('active');
}

/**
* @description create navigation bar dynamically by looping through page's section
*/
// Build menu 
const createNavBar = () => {
    // create virtual dom
    const DOC_FRAGMENT = document.createDocumentFragment();
    for (const section of sections) {
        // create new li and add a default class to it
        let link = document.createElement('li');
        link.classList.add('menu__link');
        // set li text
        link.textContent = section.querySelector('h2').textContent;
        // set data attribute for id for future linking
        link.setAttribute('data-id', `#${section.id}`);

        // Scroll to section on link click
        link.addEventListener('click', function () {
            scrollTo(section.id);
        });
        // append navbar to virtual dom
        DOC_FRAGMENT.append(link);
    }
    // reflow & repaint
    navContainer.appendChild(DOC_FRAGMENT);
    documentContentLoaded = true;
}

/**
* @description bootstrap function
*/
const init = () => {
    document.addEventListener('DOMContentLoaded', function () {
        navContainer = document.querySelector('#navbar__list');
        sections = document.querySelectorAll('section');
        createNavBar();
        links = document.querySelectorAll('.menu__link');
    });
}

/**
 * End Main Functions
 * Begin Events
 *
*/
let t;
// Add class 'active' to section when near top of viewport
window.addEventListener('scroll', function (e) {
    if (documentContentLoaded) {
        let activeSection = getActiveSection();
        if (activeSection) {

            setActiveSectionStyle(activeSection);
        }
    }
})

// Call Functions
init();