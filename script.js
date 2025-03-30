let currentLevel = 0;
let ancestorData = [];
let currentLanguage = 'en';

const translations = {
en: {
        title: "Hungarian Citizenship Eligibility Checker",
        birthyear: "Year of Birth:",
        country: "Born in Hungary?",
        countryNo: "No",
        countryYes: "Yes",
        next: "Next",
        ancestorGender: "Gender:",
        ancestorMale: "Male",
        ancestorFemale: "Female",
        ancestorBirthyear: "Year of Birth:",
        ancestorCountry: "Born in Hungary?",
        ancestorCountryNo: "No",
        ancestorCountryYes: "Yes",
        hungaryYears: "Years Lived in Hungary (e.g., 1900-1910, 1920-1925):",
        hungaryPlaceholder: "Enter periods like 1900-1910, 1920-1925",
        nextAncestor: "Next Ancestor",
        submit: "Submit",
        result: "Result",
        your: "Information about you",
        parentHungarian: "Information about Parent on Hungarian Line",
        grandparentHungarian: "Information about Grandparent on Hungarian Line",
        greatGrandparentHungarian: "Information about Great Grandparent on Hungarian Line",
        greatGreatGrandparentHungarian: "Information about Great Great Grandparent on Hungarian Line",
        greatPrefixHungarian: "Great ",
        bornIn: "Born in",
        aboutYou: "About you:",
        back: "Back",
        errors: {
            fillFields: "Please fill in all fields.",
            hungaryYears: "Please enter the years lived in Hungary."
        },
        results: {
            no: "It is not possible to get citizenship: Your ancestor was born and left Hungary before the 1879 nationality law.",
            no1800: "It is not possible to get citizenship: No Hungarian ancestry was found by the year 1800.",
            simplified: "Yes by simplified naturalization: You have Hungarian ancestry and can apply, but you need to learn Hungarian.",
            simplifiedFemale: "Yes by simplified naturalization: A female ancestor gave birth before 1957, breaking the direct citizenship chain, but you can still apply with Hungarian ancestry if you learn Hungarian.",
            simplifiedLost: "Yes by simplified naturalization: Your ancestor lost citizenship after leaving Hungary before 1929 and staying abroad for over 10 years, but you can still apply with Hungarian ancestry if you learn Hungarian.",
            simplifiedBoth: "Yes by simplified naturalization: Your ancestor lost citizenship after leaving Hungary before 1929 and staying abroad for over 10 years, and a female ancestor gave birth before 1957, breaking the direct citizenship chain. You can still apply with Hungarian ancestry if you learn Hungarian.",
            verificationParent: "Yes, you can get Hungarian citizenship by verification: Your parent was a Hungarian citizen, and citizenship was passed to you (post-1957 from either parent, or pre-1957 from father). No language requirement.",
            verificationModern: "Yes, you can get Hungarian citizenship by verification: Your ancestor retained citizenship under modern laws, and you can verify it without learning Hungarian."
        }
    },
es: {
        title: "Verificador de Elegibilidad para la Ciudadanía Húngara",
        birthyear: "Año de Nacimiento:",
        country: "¿Nacido en Hungría?",
        countryNo: "No",
        countryYes: "Sí",
        next: "Siguiente",
        ancestorGender: "Género:",
        ancestorMale: "Masculino",
        ancestorFemale: "Femenino",
        ancestorBirthyear: "Año de Nacimiento:",
        ancestorCountry: "¿Nacido en Hungría?",
        ancestorCountryNo: "No",
        ancestorCountryYes: "Sí",
        hungaryYears: "Años Vividos en Hungría (ej., 1900-1910, 1920-1925):",
        hungaryPlaceholder: "Ingresa períodos como 1900-1910, 1920-1925",
        nextAncestor: "Siguiente Ancestro",
        submit: "Enviar",
        result: "Resultado",
        your: "Información sobre ti",
        parentHungarian: "Información sobre el Padre o Madre en la Línea Húngara",
        grandparentHungarian: "Información sobre el Abuelo/a en la Línea Húngara",
        greatGrandparentHungarian: "Información sobre el Bisabuelo/a en la Línea Húngara",
        greatGreatGrandparentHungarian: "Información sobre el Tatarabuelo/a en la Línea Húngara",
        greatPrefixHungarian: "Tatara ",
        bornIn: "Nacido en",
        aboutYou: "Sobre ti:",
        back: "Volver",
        errors: {
            fillFields: "Por favor, completa todos los campos.",
            hungaryYears: "Por favor, ingresa los años vividos en Hungría."
        },
        results: {
            no: "No es posible obtener la ciudadanía: Tu ancestro nació y dejó Hungría antes de la ley de nacionalidad de 1879.",
            no1800: "No es posible obtener la ciudadanía: No se encontró ascendencia húngara hasta el año 1800.",
            simplified: "Sí por naturalización simplificada: Tienes ascendencia húngara y puedes solicitarla, pero necesitas aprender húngaro.",
            simplifiedFemale: "Sí por naturalización simplificada: Una ancestra dio a luz antes de 1957, rompiendo la cadena directa de ciudadanía, pero aún puedes solicitarla con ascendencia húngara si aprendes húngaro.",
            simplifiedLost: "Sí por naturalización simplificada: Tu ancestro perdió la ciudadanía tras dejar Hungría antes de 1929 y permanecer fuera por más de 10 años, pero aún puedes solicitarla con ascendencia húngara si aprendes húngaro.",
            simplifiedBoth: "Sí por naturalización simplificada: Tu ancestro perdió la ciudadanía tras dejar Hungría antes de 1929 y permanecer fuera por más de 10 años, y una ancestra dio a luz antes de 1957, rompiendo la cadena directa de ciudadanía. Aún puedes solicitarla con ascendencia húngara si aprendes húngaro.",
            verificationParent: "Sí, puedes obtener la ciudadanía húngara por verificación: Tu padre o madre fue ciudadano húngaro y te pasó la ciudadanía (post-1957 de cualquier progenitor, o pre-1957 del padre). No se requiere idioma.",
            verificationModern: "Sí, puedes obtener la ciudadanía húngara por verificación: Tu ancestro retuvo la ciudadanía bajo leyes modernas, y puedes verificarla sin aprender húngaro."
        }
    },
ro: {
        title: "Verificator de Eligibilitate pentru Cetățenia Ungară",
        birthyear: "Anul Nașterii:",
        country: "Născut în Ungaria?",
        countryNo: "Nu",
        countryYes: "Da",
        next: "Următorul",
        ancestorGender: "Gen:",
        ancestorMale: "Masculin",
        ancestorFemale: "Feminin",
        ancestorBirthyear: "Anul Nașterii:",
        ancestorCountry: "Născut în Ungaria?",
        ancestorCountryNo: "Nu",
        ancestorCountryYes: "Da",
        hungaryYears: "Anii Trăiți în Ungaria (ex., 1900-1910, 1920-1925):",
        hungaryPlaceholder: "Introdu perioade ca 1900-1910, 1920-1925",
        nextAncestor: "Următorul Strămoș",
        submit: "Trimite",
        result: "Rezultat",
        your: "Informații despre tine",
        parentHungarian: "Informații despre Părinte din Linia Ungară",
        grandparentHungarian: "Informații despre Bunic/Bunică din Linia Ungară",
        greatGrandparentHungarian: "Informații despre Străbunic/Străbunică din Linia Ungară",
        greatGreatGrandparentHungarian: "Informații despre Stră-străbunic/Stră-străbunică din Linia Ungară",
        greatPrefixHungarian: "Stră-",
        bornIn: "Născut în",
        aboutYou: "Despre tine:",
        back: "Înapoi",
        errors: {
            fillFields: "Vă rugăm să completați toate câmpurile.",
            hungaryYears: "Vă rugăm să introduceți anii trăiți în Ungaria."
        },
        results: {
            no: "Utilizator, nu este posibil să obții cetățenia: Strămoșul tău s-a născut și a părăsit Ungaria înainte de legea naționalității din 1879.",
            no1800: "Utilizator, nu este posibil să obții cetățenia: Nu s-a găsit ascendență ungară până în anul 1800.",
            simplified: "Utilizator, da prin naturalizare simplificată: Ai ascendență ungară și poți aplica, dar trebuie să înveți maghiara.",
            simplifiedFemale: "Utilizator, da prin naturalizare simplificată: O strămoașă a născut înainte de 1957, întrerupând lanțul direct al cetățeniei, dar poți aplica cu ascendență ungară dacă înveți maghiara.",
            simplifiedLost: "Utilizator, da prin naturalizare simplificată: Strămoșul tău a pierdut cetățenia după ce a părăsit Ungaria înainte de 1929 și a rămas în străinătate peste 10 ani, dar poți aplica cu ascendență ungară dacă înveți maghiara.",
            simplifiedBoth: "Utilizator, da prin naturalizare simplificată: Strămoșul tău a pierdut cetățenia după ce a părăsit Ungaria înainte de 1929 și a rămas în străinătate peste 10 ani, iar o strămoașă a născut înainte de 1957, întrerupând lanțul direct al cetățeniei. Poți aplica cu ascendență ungară dacă înveți maghiara.",
            verificationParent: "Utilizator, da, poți obține cetățenia ungară prin verificare: Părintele tău a fost cetățean ungar și ți-a transmis cetățenia (post-1957 de la oricare părinte, sau pre-1957 de la tată). Nu este necesar să știi limba.",
            verificationModern: "Utilizator, da, poți obține cetățenia ungară prin verificare: Tu sau un strămoș al tău ați păstrat cetățenia conform legilor moderne, și o poți verifica fără să înveți maghiara."
        }
    },
uk: {
        title: "Перевірка права на угорське громадянство",
        birthyear: "Рік народження:",
        country: "Народжений в Угорщині?",
        countryNo: "Ні",
        countryYes: "Так",
        next: "Далі",
        ancestorGender: "Стать:",
        ancestorMale: "Чоловік",
        ancestorFemale: "Жінка",
        ancestorBirthyear: "Рік народження:",
        ancestorCountry: "Народжений в Угорщині?",
        ancestorCountryNo: "Ні",
        ancestorCountryYes: "Так",
        hungaryYears: "Роки проживання в Угорщині (напр., 1900-1910, 1920-1925):",
        hungaryPlaceholder: "Введіть періоди, наприклад, 1900-1910, 1920-1925",
        nextAncestor: "Наступний предок",
        submit: "Надіслати",
        result: "Результат",
        your: "Інформація про вас",
        parentHungarian: "Інформація про Батька/Матір з Угорської Лінії",
        grandparentHungarian: "Інформація про Діда/Бабцю з Угорської Лінії",
        greatGrandparentHungarian: "Інформація про Прадіда/Прабабцю з Угорської Лінії",
        greatGreatGrandparentHungarian: "Інформація про Прапрадіда/Прапрабабцю з Угорської Лінії",
        greatPrefixHungarian: "Пра-",
        bornIn: "Народжений в",
        aboutYou: "Про вас:",
        back: "Назад",
        errors: {
            fillFields: "Будь ласка, заповніть усі поля.",
            hungaryYears: "Будь ласка, введіть роки проживання в Угорщині."
        },
        results: {
            no: "Користувач, неможливо отримати громадянство: Ваш предок народився і покинув Угорщину до закону про національність 1879 року.",
            no1800: "Користувач, неможливо отримати громадянство: Угорське походження не знайдено до 1800 року.",
            simplified: "Користувач, так через спрощену натуралізацію: У вас є угорське походження, і ви можете подати заяву, але потрібно вивчити угорську.",
            simplifiedFemale: "Користувач, так через спрощену натуралізацію: Жіночий предок народила до 1957 року, перервавши прямий ланцюг громадянства, але ви можете подати заяву з угорським походженням, якщо вивчите угорську.",
            simplifiedLost: "Користувач, так через спрощену натуралізацію: Ваш предок втратив громадянство після того, як покинув Угорщину до 1929 року і залишався за кордоном понад 10 років, але ви можете подати заяву з угорським походженням, якщо вивчите угорську.",
            simplifiedBoth: "Користувач, так через спрощену натуралізацію: Ваш предок втратив громадянство після того, як покинув Угорщину до 1929 року і залишався за кордоном понад 10 років, а жіночий предок народила до 1957 року, перервавши прямий ланцюг громадянства. Ви можете подати заяву з угорським походженням, якщо вивчите угорську.",
            verificationParent: "Користувач, так, ви можете отримати угорське громадянство за підтвердженням: Ваш батько чи мати були громадянами Угорщини, і громадянство передалося вам (після 1957 від будь-якого з батьків, або до 1957 від батька). Знання мови не потрібне.",
            verificationModern: "Користувач, так, ви можете отримати угорське громадянство за підтвердженням: Ви або ваш предок зберегли громадянство за сучасними законами, і ви можете його підтвердити без вивчення угорської."
        }
    },
hu: {
        title: "Magyar Állampolgársági Jogosultság Ellenőrző",
        birthyear: "Születési év:",
        country: "Magyarországon született?",
        countryNo: "Nem",
        countryYes: "Igen",
        next: "Következő",
        ancestorGender: "Nem:",
        ancestorMale: "Férfi",
        ancestorFemale: "Nő",
        ancestorBirthyear: "Születési év:",
        ancestorCountry: "Magyarországon született?",
        ancestorCountryNo: "Nem",
        ancestorCountryYes: "Igen",
        hungaryYears: "Magyarországon élt évek (pl. 1900-1910, 1920-1925):",
        hungaryPlaceholder: "Adja meg az időszakokat, például 1900-1910, 1920-1925",
        nextAncestor: "Következő ős",
        submit: "Beküldés",
        result: "Eredmény",
        your: "Információ önről",
        parentHungarian: "Információ a magyar vonalon lévő szülőről",
        grandparentHungarian: "Információ a magyar vonalon lévő nagyszülőről",
        greatGrandparentHungarian: "Információ a magyar vonalon lévő dédszülőről",
        greatGreatGrandparentHungarian: "Információ a magyar vonalon lévő ükszülőről",
        greatPrefixHungarian: "Ük",
        bornIn: "Született",
        aboutYou: "Önről:",
        back: "Vissza",
        errors: {
            fillFields: "Kérjük, töltse ki az összes mezőt.",
            hungaryYears: "Kérjük, adja meg a Magyarországon eltöltött éveket."
        },
    results: {
        no: "Nem lehetséges az állampolgárság megszerzése: Őse 1879 előtt született és elhagyta Magyarországot az állampolgársági törvény előtt.",
        no1800: "Nem lehetséges az állampolgárság megszerzése: Nem található magyar ős 1800-ig.",
        simplified: "Igen, egyszerűsített honosítással: Van magyar származása, és igényelheti, de meg kell tanulnia magyarul.",
        simplifiedFemale: "Igen, egyszerűsített honosítással: Egy női ős 1957 előtt szült, így megszakadt az állampolgársági lánc, de még mindig igényelheti, ha megtanul magyarul.",
        simplifiedLost: "Igen, egyszerűsített honosítással: Őse elvesztette az állampolgárságát, miután 1929 előtt elhagyta Magyarországot és több mint 10 évig külföldön élt. Még mindig igényelheti magyar származással, ha megtanul magyarul.",
        simplifiedBoth: "Igen, egyszerűsített honosítással: Őse elvesztette az állampolgárságát 1929 előtt, és egy női ős 1957 előtt szült. Még mindig igényelheti magyar származással, ha megtanul magyarul.",
        verificationParent: "Igen, igazolással megszerezhető a magyar állampolgárság: Az ön szülője magyar állampolgár volt, így ön is az (1957 után bármelyik szülőtől, előtte csak az apától). Nincs nyelvi követelmény.",
        verificationModern: "Igen, igazolással megszerezhető a magyar állampolgárság: Őse a modern törvények szerint megőrizte az állampolgárságát, így ön is igazolhatja azt magyar nyelvtudás nélkül."
    }
},


};


function changeLanguage() {
    currentLanguage = document.getElementById("language-select").value;
    updateUIText();
}

function updateUIText() {
    const t = translations[currentLanguage];
    const isAncestorFormVisible = document.getElementById('ancestor-form').style.display === 'block';
    const isResultVisible = document.getElementById('result').style.display === 'block';

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
    ancestorData.push({ level: 'self', birthyear });
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
    if (currentLevel === 0) {
        document.getElementById('ancestor-form').style.display = 'none';
        document.getElementById('initial-form').style.display = 'block';
        const selfData = ancestorData.pop() || { birthyear: '' };
        document.getElementById('birthyear').value = selfData.birthyear || '';
        currentLevel = 0;
    } else if (currentLevel > 0) {
        const previousData = ancestorData.pop();
        currentLevel--;
        if (currentLevel === 0) {
            document.getElementById('ancestor-form').style.display = 'none';
            document.getElementById('initial-form').style.display = 'block';
            document.getElementById('birthyear').value = previousData.birthyear || '';
        } else {
            showAncestorForm(getAncestorTitle(currentLevel), previousData.country === 'hungary', previousData);
        }
        updateUIText();
    }
}

function goBackFromResult() {
    document.getElementById('result').style.display = 'none';
    if (ancestorData.length === 1 && ancestorData[0].country === 'hungary' && ancestorData[0].birthyear >= 1930) {
        document.getElementById('initial-form').style.display = 'block';
        const selfData = ancestorData.pop();
        document.getElementById('birthyear').value = selfData.birthyear || '';
        currentLevel = 0;
    } else {
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

updateUIText();