const page = document.querySelector("#page");
const header = document.querySelector("#header");
const left = document.querySelector("#left");
const middle = document.querySelector("#middle");
const right = document.querySelector("#right");
const footer = document.querySelector("#footer");
let type, params;


const elementSelect = {
    title: [
        'headerType',
        'color',
        'content',
    ],
    p: [
        'fontSize',
        'color',
        'content',
    ],
    input: [
        'inputType',
        'fontSize',
        'color',
        'content',
    ],
    button: [
        'fontSize',
        'color',
        'content',
        'background',
    ],
    img: [
        'mediaType',
        'linkUrl',
        'height',
        'width'
    ],
    a: [
        'linkN',
        'linkUrl',
    ],
};

restorePage();//לשחזר

function bgChange(elem) {
    page.style.backgroundColor = elem.value;
    savePage();
}

function getPattern() {
    return localStorage.getItem("choosenPattern");
}

function paddingChange(elem) {
    page.style.padding = elem.value + 'px';

    // להוסיף תנאי קצה
}

// מעבר בין עיצוב כללי לאלמנטים
function pageToShow(id, elem) {
    if (localStorage.getItem("choosenPattern") !== null) {
        document.querySelector('nav a.active').classList.remove('active');
        elem.classList.add('active');

        document.querySelector('#panelSide>div.show').classList.remove('show');
        document.getElementById(id).classList.add('show');
    } else {
        let patternArea = document.getElementById("patternAreaRequired")
        patternArea.style.display = 'block'
        patternArea.focus();

    }
}

// בחירת סוג האלמנט
function typeSelect(selectElem) {
    type = selectElem.value;
    params = elementSelect[type];
    if (type !== "null") {
        // הסתרת כל האלמנטים המוצגים
        const divs = document.querySelectorAll('#params>div');

        for (const div of divs) {
            div.classList.remove('show');
        }

        // הצגת האלמטים הנצרכים
        for (const param of params) {
            document.getElementById(param).classList.add('show');
        }
    }
}

function addFieldsValidationBySelect(select, LabelRequired) {
    if (select !== 'chooseArea') {
        LabelRequired.style.display = 'none'
    } else {
        LabelRequired.style.display = 'block'
        LabelRequired.focus();
    }
}

function addFieldsValidationByInput(input, LabelRequired) {
    if (input.trim() === '') {
        LabelRequired.style.display = 'block'
    } else {
        LabelRequired.style.display = 'none'
        LabelRequired.focus();
    }
}

function add() {

    //fields validation
    //chooseArea
    let chooseArea = document.querySelector("#chooseArea").value;
    let chooseAreaRequired = document.querySelector("#gridType #chooseAreaRequired");
    addFieldsValidationBySelect(chooseArea, chooseAreaRequired);

    //Content
    let contentInput = document.querySelector("#contentInput").value;
    let contentInputRequired = document.querySelector("#content #contentInputRequired");
    addFieldsValidationByInput(contentInput, contentInputRequired);

    //Content
    let EnterlinkNameInput = document.querySelector("#EnterlinkName").value;
    let EnterlinkNameRequired = document.querySelector("#linkN #EnterlinkNameRequired");
    addFieldsValidationByInput(EnterlinkNameInput, EnterlinkNameRequired);

    //EnterUrl
    let EnterUrlInput = document.querySelector("#EnterUrl").value;
    let EnterUrlRequired = document.querySelector("#linkUrl #EnterUrlRequired");
    addFieldsValidationByInput(EnterUrlInput, EnterUrlRequired);

    // שם התגית כברירת מחדל זה הסוג
    let tagName = type;

    // אם הסוג הוא כותרת, שם התגית לפי מה שהמשתמש בחר
    if (type === 'title') {
        tagName = document.querySelector('#headerType select').value;
    }

    // יצירת אלמנט חדש
    const elem = document.createElement(tagName);

    const inputType = document.querySelector('#inputType select').value;
    const fontSize = document.querySelector('#fontSize input').value;
    const color = document.querySelector('#color input').value;
    const content = document.querySelector('#content input').value;
    const background = document.querySelector('#background input').value;
    const height = document.querySelector('#height input').value;
    const width = document.querySelector('#width input').value;
    const linkName = document.querySelector('#linkN input').value;
    const link = document.querySelector('#linkUrl input').value;
    const gridType = document.querySelector('#gridType select').value;

    //בחירת פרמטרים
    for (const param of params) {
        if (param === 'inputType') {
            elem.type = inputType;
        }
        else if (param === 'fontSize') {
            elem.style.fontSize = fontSize + 'px';
        }
        else if (param === 'color') {
            elem.style.color = color;
        }
        else if (param === 'background') {
            elem.style.background = background;
        }
        else if (param === 'height') {
            elem.style.height = height + 'px';
        }
        else if (param === 'width') {
            elem.style.width = width + 'px';
        }
        else if (param === 'linkUrl') {
            if (elem.tagName === 'A') {
                elem.innerHTML = linkName;
                elem.setAttribute('href', link);
            }
            else if (elem.tagName === 'IMG') {
                elem.setAttribute('src', link);
            }
        }
        else if (param === 'content') {
            if (type === 'input') {
                elem.value = content;
            } else {
                elem.innerHTML = content;
            }
        }
    }
    // בחירת תבנית
    if (getPattern() === 'Page') {
        page.appendChild(elem);
    }
    else if (getPattern() === 'Layout') {
        if (gridType === 'Header') {
            header.appendChild(elem);
        }
        else if (gridType === 'Left') {
            left.appendChild(elem);
        }
        else if (gridType === 'Middle') {
            middle.appendChild(elem);
        }
        else if (gridType === 'Right') {
            right.appendChild(elem);
        }
        else if (gridType === 'Footer') {
            footer.appendChild(elem);
        }
    }
    savePage();

    //clear fields after add
    document.querySelector("#chooseArea").value = 'chooseArea';
    document.querySelector("#contentInput").value = '';
    document.querySelector("#EnterlinkName").value = '';
    document.querySelector("#EnterUrl").value = '';
}

// שמירת הדף בזיכרון המקומי
function savePage() {
    if (getPattern() === 'Page') {
        localStorage.style = page.attributes.style?.value;
        localStorage.page = page.innerHTML;
    }
    else if (getPattern() === 'Layout') {

        localStorage.style = header.attributes.style?.value;
        localStorage.header = header.innerHTML;
        localStorage.style = left.attributes.style?.value;
        localStorage.left = left.innerHTML;
        localStorage.style = right.attributes.style?.value;
        localStorage.right = right.innerHTML;
        localStorage.style = middle.attributes.style?.value;
        localStorage.middle = middle.innerHTML;
        localStorage.style = footer.attributes.style?.value;
        localStorage.footer = footer.innerHTML;
        localStorage.style = page.attributes.style?.value;
    }

}
// שחזור הדף
function restorePage() {

    //add grid type to elementSelect
    if (localStorage.getItem("choosenPattern") === "Layout") {
        addGridTypeOption('add');
    }

    if (getPattern() !== null) {
        let BgAndPaddingArea = document.getElementById("BgAndPaddingAreaRequired");
        BgAndPaddingArea.style.display = 'block'
    }

    //restore choose pattern
    let patternVal = document.querySelector("#pattern");
    let isDisabled = localStorage.getItem("choosePatternDisabled");
    if (isDisabled) {
        patternVal.setAttribute('disabled', isDisabled || '');
    }

    if (getPattern() === 'Page') {
        page.innerHTML = localStorage.page || '';
        page.setAttribute('style', localStorage.style || '');
    }
    else if (getPattern() === 'Layout') {
        header.innerHTML = localStorage.header || '';
        header.setAttribute('style', localStorage.style || '');
        left.innerHTML = localStorage.left || '';
        left.setAttribute('style', localStorage.style || '');
        right.innerHTML = localStorage.right || '';
        right.setAttribute('style', localStorage.style || '');
        middle.innerHTML = localStorage.middle || '';
        middle.setAttribute('style', localStorage.style || '');
        footer.innerHTML = localStorage.footer || '';
        footer.setAttribute('style', localStorage.style || '');
        page.setAttribute('style', localStorage.style || '');

    }
}

// נעילת בחירה
function selectedPattern() {
    let patternVal = document.querySelector("#pattern").value;

    if (patternVal === "Page" || patternVal === "Layout") {
        document.querySelector("#pattern").disabled = true;

        //save val in local storage
        localStorage.setItem("choosePatternDisabled", true);
        localStorage.setItem("choosenPattern", patternVal);

        //add grid type to elementSelect
        if (localStorage.getItem("choosenPattern") === "Layout") {
            addGridTypeOption('add');
        }

        //remove required
        let patternArea = document.getElementById("patternAreaRequired");
        patternArea.style.display = 'none';

        let BgAndPaddingArea = document.getElementById("BgAndPaddingAreaRequired");
        BgAndPaddingArea.style.display = 'block';
    }
}

function addGridTypeOption() {
    for (const key in elementSelect) {
        if (!elementSelect[key].includes('gridType')) {
            elementSelect[key].unshift('gridType');
        }
    }
}

// הסרת דף
function removePage() {
    localStorage.clear();
    location.reload();
}

page.addEventListener('input', savePage);
