let currentLevel = 0;
let ancestorData = [];
let currentLanguage = localStorage.getItem('preferredLanguage') || 'en'; // Load from localStorage or default to 'en'
let currentResultKey = ''; // To track the result key for language updates

function changeLanguage() {
    currentLanguage = document.getElementById("language-select").value;
    localStorage.setItem('preferredLanguage', currentLanguage); // Save to localStorage
    updateUIText();
}

function updateUIText() {
    const t = translations[currentLanguage];
    const isAncestorFormVisible = document.getElementById('ancestor-form').style.display === 'block';
    const isResultVisible = document.getElementById('result').style.display === 'block';

    // Set the dropdown to the current language
    document.getElementById('language-select').value = currentLanguage;

    document.getElementById('title').textContent = t.title;
    document.getElementById('about-you').textContent = t.aboutYou;
    document.getElementById('label-birthyear').textContent = t.birthyear;
    document.getElementById('next-btn').textContent = t.next;

    if (isAncestorFormVisible) {
        document.getElementById('label-ancestor-gender').textContent = t.ancestorGender;
        document.getElementById('option-ancestor-male').textContent = t.ancestorMale;
        document.getElementById('option-ancestor-female').textContent = t.ancestorFemale;
        document.getElementById('label-ancestor-birthyear').textContent = t.ancestorBirthyear;
        document.getElementById('label-ancestor-country').textContent = t.ancestorCountry;
        document.getElementById('option-ancestor-country-no').textContent = t.ancestorCountryNo;
        document.getElementById('option-ancestor-country-yes').textContent = t.ancestorCountryYes;
        document.getElementById('label-hungary-years').textContent = t.hungaryYears;
        document.getElementById('hungary-years').placeholder = t.hungaryPlaceholder;
        document.getElementById('back-btn').textContent = t.back;

        const actionBtn = document.getElementById('action-btn');
        const isHungary = document.getElementById('ancestor-country').value === 'hungary';
        actionBtn.textContent = isHungary ? t.submit : t.nextAncestor;

        const ancestorTitle = document.getElementById('ancestor-title');
        ancestorTitle.textContent = `${getAncestorTitle(currentLevel)}${isHungary ? ` (${t.bornIn} ${getHungaryText()})` : ''}`;
    }

    if (isResultVisible) {
        document.getElementById('result-title').textContent = t.result;
        document.getElementById('back-btn-result').textContent = t.back;
        if (currentResultKey) {
            document.getElementById('result-text').textContent = t.results[currentResultKey];
        }
    }
}

function getHungaryText() {
    return currentLanguage === 'es' ? 'Hungría' : currentLanguage === 'ro' ? 'Ungaria' : currentLanguage === 'uk' ? 'Угорщина' : currentLanguage === 'hu' ? 'Magyarország' : 'Hungary';
}

function nextStep() {
    const birthyear = parseInt(document.getElementById('birthyear').value);
    if (!birthyear) {
        alert(translations[currentLanguage].errors.fillFields);
        return;
    }
    // Ensure the self data is always at index 0
    if (ancestorData.length === 0) {
        ancestorData.push({ level: 'self', birthyear });
    } else {
        ancestorData[0] = { level: 'self', birthyear }; // Update if already exists
    }
    document.getElementById('initial-form').style.display = 'none';
    currentLevel = 1;
    showAncestorForm(getAncestorTitle(currentLevel), false);
    updateUIText();
}

function getAncestorTitle(level) {
    const t = translations[currentLanguage];
    if (level === 0) return t.your;
    if (level === 1) return t.parentHungarian;
    if (level === 2) return t.grandparentHungarian;
    if (level === 3) return t.greatGrandparentHungarian;
    if (level === 4) return t.greatGreatGrandparentHungarian;
    return `${t.greatPrefixHungarian.repeat(level - 3)}${t.greatGrandparentHungarian}`;
}

function showAncestorForm(levelTitle, isHungary, previousData = null) {
    document.getElementById('ancestor-form').style.display = 'block';
    document.getElementById('initial-form').style.display = 'none';
    document.getElementById('result').style.display = 'none';
    const t = translations[currentLanguage];
    
    document.getElementById('ancestor-title').textContent = `${levelTitle}${isHungary ? ` (${t.bornIn} ${getHungaryText()})` : ''}`;

    if (previousData) {
        document.getElementById('ancestor-gender').value = previousData.gender || 'male';
        document.getElementById('ancestor-birthyear').value = previousData.birthyear || '';
        document.getElementById('ancestor-country').value = previousData.country || 'no';
        document.getElementById('hungary-years').value = previousData.years ? 
            previousData.years.map(p => `${p.start}-${p.end}`).join(', ') : '';
    } else {
        document.getElementById('ancestor-gender').value = 'male';
        document.getElementById('ancestor-birthyear').value = '';
        document.getElementById('ancestor-country').value = isHungary ? 'hungary' : 'no';
        document.getElementById('hungary-years').value = '';
    }

    const birthyear = parseInt(document.getElementById('ancestor-birthyear').value) || 0;
    document.getElementById('hungary-details').style.display = isHungary && birthyear < 1930 && birthyear > 0 ? 'block' : 'none';
    document.getElementById('action-btn').textContent = isHungary ? t.submit : t.nextAncestor;
}

function updateHungaryDetails() {
    const country = document.getElementById('ancestor-country').value;
    const birthyear = parseInt(document.getElementById('ancestor-birthyear').value) || 0;
    const isHungary = country === 'hungary';
    const t = translations[currentLanguage];
    const showHungaryDetails = isHungary && birthyear < 1930 && birthyear > 0;
    document.getElementById('hungary-details').style.display = showHungaryDetails ? 'block' : 'none';
    document.getElementById('action-btn').textContent = isHungary ? t.submit : t.nextAncestor;
    const levelTitle = getAncestorTitle(currentLevel);
    document.getElementById('ancestor-title').textContent = `${levelTitle}${isHungary ? ` (${t.bornIn} ${getHungaryText()})` : ''}`;
}

function handleAction() {
    const gender = document.getElementById('ancestor-gender').value;
    const birthyear = parseInt(document.getElementById('ancestor-birthyear').value);
    const country = document.getElementById('ancestor-country').value;
    
    if (!birthyear || !country) {
        alert(translations[currentLanguage].errors.fillFields);
        return;
    }

    const isHungary = country === 'hungary';
    const level = currentLevel === 0 ? 'self' : getAncestorTitle(currentLevel).toLowerCase();
    const newAncestor = { level, country, gender, birthyear };

    if (birthyear <= 1800 && !ancestorData.some(a => a.country === 'hungary')) {
        showResult('no1800');
        return;
    }

    if (isHungary) {
        if (birthyear < 1930) {
            const yearsText = document.getElementById('hungary-years').value.trim();
            if (!yearsText) {
                alert(translations[currentLanguage].errors.hungaryYears);
                return;
            }
            const periods = yearsText.split(',').map(period => {
                const [start, end] = period.trim().split('-').map(Number);
                return { start, end: end || start };
            });
            newAncestor.years = periods;
        }
        ancestorData.push(newAncestor);
        determineEligibility();
    } else {
        ancestorData.push(newAncestor);
        currentLevel++;
        showAncestorForm(getAncestorTitle(currentLevel), false);
        updateUIText();
    }
}

function goBack() {
    if (currentLevel === 1) { // Going back to initial form
        document.getElementById('ancestor-form').style.display = 'none';
        document.getElementById('initial-form').style.display = 'block';
        // Pop the last ancestor (if any) but keep self data
        if (ancestorData.length > 1) {
            ancestorData.pop(); // Remove the ancestor data at level 1
        }
        const selfData = ancestorData[0] || { birthyear: '' }; // Use self data or default
        document.getElementById('birthyear').value = selfData.birthyear || '';
        currentLevel = 0;
    } else if (currentLevel > 1) { // Going back between ancestor levels
        const previousData = ancestorData.pop();
        currentLevel--;
        showAncestorForm(getAncestorTitle(currentLevel), previousData.country === 'hungary', previousData);
    }
    updateUIText();
}

function goBackFromResult() {
    document.getElementById('result').style.display = 'none';
    if (ancestorData.length === 1) { // Only self data exists
        document.getElementById('initial-form').style.display = 'block';
        const selfData = ancestorData[0];
        document.getElementById('birthyear').value = selfData.birthyear || '';
        currentLevel = 0;
    } else { // Go back to the last ancestor form
        const previousData = ancestorData.pop();
        currentLevel--;
        showAncestorForm(getAncestorTitle(currentLevel), previousData.country === 'hungary', previousData);
    }
    updateUIText();
}

function determineEligibility() {
    const hungarianAncestor = ancestorData.find(a => a.country === 'hungary');
    const birthYearHungarian = hungarianAncestor ? hungarianAncestor.birthyear : null;
    const lastYearInHungary = hungarianAncestor && hungarianAncestor.years ? Math.max(...hungarianAncestor.years.map(p => p.end)) : birthYearHungarian;
    const self = ancestorData[0];

    let resultKey = '';
    let lostCitizenship = false;
    let femaleBreak = false;

    if (!hungarianAncestor || (birthYearHungarian < 1879 && lastYearInHungary < 1879)) {
        resultKey = 'no';
    } else {
        if (birthYearHungarian < 1930 && lastYearInHungary < 1929 && (new Date().getFullYear() - lastYearInHungary) > 10) {
            lostCitizenship = true;
        }

        for (let i = ancestorData.length - 1; i > 0; i--) {
            const child = ancestorData[i - 1];
            const parent = ancestorData[i];
            if (child.birthyear < 1957 && parent.gender === 'female') {
                femaleBreak = true;
                break;
            }
        }

        if (!lostCitizenship && !femaleBreak) {
            const parentOfSelf = ancestorData[1] || null;
            if (parentOfSelf && parentOfSelf.country === 'hungary') {
                if (self.birthyear >= 1957 || (self.birthyear < 1957 && parentOfSelf.gender === 'male')) {
                    resultKey = 'verificationParent';
                } else {
                    resultKey = 'simplified';
                }
            } else if (birthYearHungarian >= 1930 || (lastYearInHungary && lastYearInHungary >= 1929)) {
                resultKey = 'verificationModern';
            } else {
                resultKey = 'simplified';
            }
        } else {
            if (lostCitizenship && femaleBreak) {
                resultKey = 'simplifiedBoth';
            } else if (lostCitizenship) {
                resultKey = 'simplifiedLost';
            } else if (femaleBreak) {
                resultKey = 'simplifiedFemale';
            }
        }
    }

    showResult(resultKey);
}

function showResult(resultKey) {
    document.getElementById('ancestor-form').style.display = 'none';
    document.getElementById('initial-form').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    currentResultKey = resultKey;
    document.getElementById('result-text').textContent = translations[currentLanguage].results[resultKey];
    updateUIText();
}

updateUIText(); // Initial call to set translations and dropdown