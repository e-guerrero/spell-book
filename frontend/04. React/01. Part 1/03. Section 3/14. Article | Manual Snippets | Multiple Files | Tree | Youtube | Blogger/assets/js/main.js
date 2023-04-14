/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')


/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader = document.querySelectorAll('.skills__header')

function toggleSkills(){
    let itemClass = this.parentNode.className
    
    for(i = 0; i < skillsContent.length; i++){
        skillsContent[i].className = 'skills__content skills__close'
    }
    if(itemClass === 'skills__content skills__close'){
        this.parentNode.className = 'skills__content skills__open'
    }
}

skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills)
})

/*==================== DYNAMICALLY GENERATED SKILLS ====================*/

function parseSkillPaths(tree) {

    const skill = {
        name: null,
        percentage: null,
        parts: [],
        
        part: {
            title: null,
            sections: [],

            section: {
                title: null,
                articles: [],

                article: {
                    title: null, // mandatory
                    youtubeURL: null, // optional
                    bloggerURL: null, // optional
                    // Just because there is a Github link, doesn't mean there should be 
                    //  a value here. Only fill this in...
                    //      
                    //      if article file tree is >1 level deep.
                    //      if there's >= 1 snippet.
                    //      
                    githubURL: null, // conditional  
                    // Otional but If no snippets and only 1 level deep: mandatory 
                    // If mandatpry, you would save all code from each file as snippets.
                    snippets: [], // optional  
                    snippet: { 
                        filePath: null,
                        range: {
                            startLine: null,
                            endLine: null
                        },
                        ranges: []
                    }
                }
            }
        },
    } 


    // To-do
    tree.forEach(function(branch) {
        console.log(branch.path);

        // drop-down /1 level and no snippets

        // github only  /many levels and No readme

        // snippet (drop down and github) /Any level amnt and readme

        // blog /Any level amnt and readme

        // youtube /Any level amnt and readme

        return skills;
    });
    // // Depth of path
    // let pathLevels = "";
    // // To search for characters in path string.
    // let startIndex = 0;
    // let endIndex = 0;
    // // Path directories
    // let categoryDirectory = "";
    // let skillDirectory = "";
    // // Array of skill objects
    // let paths = [];
    // fetchResult.tree.forEach(function(result) {
    //     pathLevels = (result.path.match(/\//g) || []).length + 1;
    //     // If this path is 2 levels deep, then it contains the category and skill
    //     //  needed to make a skillPath object.
    //     //      Example: frontend/1. HTML is 2 levels deep.
    //     if (pathLevels === 2) {
    //         // Get category directory from path
    //         startIndex = 0;
    //         endIndex = result.path.indexOf("/");
    //         categoryDirectory = result.path.slice(startIndex, endIndex);
    //         // Get skill directory from path
    //         startIndex = ++endIndex;
    //         endIndex = result.path.length;
    //         skillDirectory = result.path.slice(startIndex, endIndex);

    //         const path = new Object();
    //         path.string = `${categoryDirectory}/${skillDirectory}`;
    //         path.category = categoryDirectory;
    //         //  Get the skill name by removing the sequential numeration.
    //         //      Note: Category name doesn't need to be handled.
    //         startIndex = skillDirectory.indexOf(".") + 1;
    //         path.name =  skillDirectory.slice(startIndex, skillDirectory.length);

    //         path.numberOfLessons = 10;

    //         paths.push(path);
    //     }
    // })
    // return paths;
}




function addSkillListingToPage(category, name, percentage){
    //  Skills data container
    let skillsData_divElement = document.createElement('div');
    skillsData_divElement.classList.add('skills__data');

        //  Titles container
        let skillsTitles_divElement = document.createElement('div');
        skillsTitles_divElement.classList.add('skills__titles');
        skillsData_divElement.appendChild(skillsTitles_divElement);
            // Skills name
            let skillsName_h3Element = document.createElement('h3');
            skillsName_h3Element.classList.add('skills__name');
            skillsName_h3Element.innerText = name;
            skillsTitles_divElement.appendChild(skillsName_h3Element);
            // Skills percent
            let skillsNumber_spanElement = document.createElement('span');
            skillsNumber_spanElement.classList.add('skills__number');
            skillsNumber_spanElement.innerText = percentage;
            skillsTitles_divElement.appendChild(skillsNumber_spanElement);

        //  Skills bar container
        let skillsBar_divElement = document.createElement('div');
        skillsBar_divElement.classList.add('skills__bar');
        skillsData_divElement.appendChild(skillsBar_divElement);
            // Skills bar width
            let skillsBarWidth_spanElement = document.createElement('span');
            skillsBarWidth_spanElement.classList.add('skills__percentage');
            skillsBarWidth_spanElement.style.width = percentage;
            skillsBar_divElement.appendChild(skillsBarWidth_spanElement);

    // Add the element to webpage
    let skillsList_containerDiv = document.getElementById('skills-list-' + category);
    skillsList_containerDiv.appendChild(skillsData_divElement);
}


async function createSkillListing(path) {
    // Get readme file data to calculate completed percentage for each skill.

        let url = `https://api.github.com/repos/edwinguerrerotech/lecture_notes/contents/${path.string}/README.md`;
        const response = await fetch(url);
        const result = await response.json();
 
    // parse readme file data to get count of lessons to calculate percentage.
        //console.log(atob(result.content));
        const readmeText = atob(result.content);
        const flag = "count: ";
        let flagPosition = readmeText.search(flag);
        countPosition = flagPosition + flag.length;
        const count = readmeText.slice(countPosition, readmeText.length);
        console.log(count);

    // Get numbers of lessons in skill directory.
    

    const skill = {
        category: "frontend",
        name: "HTML",
        percentage: "8%"
    }
    addSkillListingToPage(skill.category,skill.name,skill.percentage);
}


fetch("https://api.github.com/repos/edwinguerrerotech/lecture_notes/git/trees/main?recursive=1")
    .then(response => {
        return response.json(); 
    })
    .then(result => {
        const skills = parseSkillPaths(result.tree);
        return skills; 
    })
    // .then(skillPaths => {
    //     skillPaths.forEach(path => {
    //         createSkillListing(path);
    //     })
    // })
      ;



// async function getSkills(){
//     let url = "https://api.github.com/repos/edwinguerrerotech/lecture_notes/git/trees/main?recursive=1";
//     const response = await fetch(url);
//     const result = await response.json();
//     console.log(result);

//     let pathLevels = "";
//     let startPosition = 0;
//     let endPosition = 0;
//     let category = "";
//     let skill = "";
//     let readmePath = "";
 
//     result.tree.forEach(function(i){
//         pathLevels = (i.path.match(/\//g) || []).length + 1;
//         // ex: frontend/1. HTML
//         if (pathLevels === 2) {
//             // Get category from path
//             startPosition = 0;
//             endPosition = i.path.indexOf("/");
//             category = i.path.slice(startPosition, endPosition);
//             // Get skill from path
//             startPosition = ++endPosition;
//             endPosition = i.path.length;
//             skill = i.path.slice(startPosition, endPosition);
            
//             //  Remove the sequential numeration in each skill name
//             //  for cleaner display of skill names.
//             // startPosition = skill.indexOf(".") + 1;
//             // skill =  skill.slice(startPosition, skill.length);
            
//             // addSkillHeader(category, skill, "40%");
//         }
//     })
//     return ["helasdc","asdc"];
// }

// async function getSkillPercentages(skills){
//     skills.forEach(skill => {

//     })
//     let url = `https://api.github.com/repos/edwinguerrerotech/lecture_notes/contents/${path}`;
//     const response = await fetch(url);
//     const result = await response.json();

//     return "10%";
// }


// getSkillPaths()
//     .then(skillPaths => {
//         skillPaths.forEach(s => {
//             getSkillPercentages(s);
//         })
//     });








/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target)
        
        tabContents.forEach(tabContent => {
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')
        
        tabs.forEach(tab => {
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll('.services__modal'),
      modalBtns = document.querySelectorAll('.services__button'),
      modalCloses = document.querySelectorAll('.services__modal-close')

let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal')
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () => {
        modal(i)
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal')
        })
    })
})

/*==================== PORTFOLIO SWIPER  ====================*/
let swiperPortfolio = new Swiper('.portfolio__container', {
    cssMode: true,
    loop: false,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
})

/*==================== TESTIMONIAL ====================*/
let swiperTestimonial = new Swiper('.testimonial__container', {
    loop: true,
    grabCursor: true,
    spaceBetween: 48,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    breakpoints: {
        568: {
            slidesPerView: 2,
        },
    }
})


/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header');
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL TOP ====================*/ 
function scrollTop(){
    let scrollTop = document.getElementById('scroll-top');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 200) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})