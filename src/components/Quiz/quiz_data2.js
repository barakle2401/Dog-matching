const QuizData = [
    {
        id: 0,
        question: "חברים מתארים אותי כאחד/ת שמתעמל/ת",
        options: { first: "מסכימ/ה", second: "לא מסכימ/ה" },
        category: "energy"
    },
    {
        id: 1,
        question: ` אעדיף בעל חיים שלא דורש הרבה תשומת לב `,
        options: { first: "לא מסכימ/ה", second: " מסכימ/ה" },
        category: "independence"
    },
    {
        id: 2,
        question: ` לעיתים קרובות אצא מהבית ליותר מ-7 שעות בזמן שהכלב לבד`,
        options: { first: `לא נכון`, second: ` נכון` },
        category: "independence"
    },
    {
        id: 3,
        question: ` יהיה לי קשה עם כלב שמתבייש או מפחד ממפגש עם אנשים חדשים`,
        options: { first: `לא`, second: `כן` },
        category: "confidence"
    },
    {
        id: 4,
        question: `בדרך כלל אעדיף לבלות  בבית או בחוץ`,
        options: { first: `בחוץ`, second: `בבית` },
        category: "energy"
    },
    {
        id: 5,
        question: ` חברים מתארים אותי כאדם אמפתי`,
        options: { first: ` מסכים`, second: `לא מסכים` },
        category: "confidence"
    },
    {
        id: 6,
        question: `בדרך כלל אשים לב לשינוי במצב הרוח של חבר קרוב`,
        options: { first: ` נכון`, second: `לא נכון` },
        category: "confidence"
    },
    {
        id: 7,
        question: `לצאת מהבית שקר וגשום`,
        options: { first: `בסדר`, second: `לא בסדר` },
        category: "energy"
    },
    {
        id: 8,
        question: `חבריי יגדירו אותי כאדם ששם לב לפרטים קטנים`,
        options: { first: `מסכים`, second: ` לא מסכים` },
        category: "confidence"
    },
    {
        id: 9,
        question: `הוצאת אנרגיה ופעילות פיזית לכלב על בסיס יומי`,
        options: { first: `הגיוני`, second: `מוגזם` },
        category: "energy"
    },
    {
        id: 10,
        question: `חשוב לי שהבית שלי יהיה נקי ומסודר תמיד`,
        options: { first: `לא נכון `, second: `נכון` },
        category: "energy"

    },
    {
        id: 11,
        question: `חבריי מגדירים אותי כאדם עסוק`,
        options: { first: `לא נכון`, second: `נכון` },
        category: "energy"
    },
    {
        id: 12,
        question: ` אם היית צריכ/ה לבחור בין שני הכלבים הבאים, במי היית בוחר/ת   `,
        options: { first: `כלב שאוהב לשחק ולהשתולל בחוץ`, second: `כלב שאוהב לרבוץ בבית` },
        category: "energy"
    },
    {
        id: 13,
        question: `  אם היית צריכ/ה לבחור בין שני הכלבים הבאים, במי היית בוחר/ת`,
        options: {
            first: `אחד שיעשה איתי פעילות גופנית`,
            second: `אחד שיהיה חלק מהמשפחה`
        },
        category: "energy"
    },
    {
        id: 14,
        question: ` אם היית צריכ/ה לבחור בין שני הכלבים הבאים במי היית בוחר/ת`,
        options: { first: `אחד שיבוא איתי לכל מקום`, second: `חבר נאמן עבורי` },
        category: "energy"
    },
    {
        id: 15,
        question: `אעדיף כלב שצריך פעילות גופנית רבה`,
        options: { first: `נכון`, second: `לא נכון` },
        category: "energy"
    },
    {
        id: 16,
        question: `אעדיף למלא הוראות מאשר לתת אותם`,
        options: { first: ` לא נכון`, second: `   נכון` },
        category: "focus"
    },
    {
        id: 17,
        question: `אעדיף כלב שילקק אותי ויתכרבל איתי`,
        options: { first: ` מסכימ/ה`, second: `לא מסכימ/ה` },
        category: "independence"
    },
    {
        id: 18,
        question: `מה מתאר אותך יותר טוב`,
        options: { first: ` ספונטי/ת`, second: `חסר/ת סבלנות` },
        category: "confidence"
    },
    {
        id: 19,
        question: `מה מתאר אותך יותר טוב`,
        options: { first: `רגיש/ה`, second: `קשוח/ה` },
        category: "confidence"
    },
    {
        id: 20,
        question: `חזרת תשוש/ה מהעבודה, והכלב בא עם כדור כדי שתשחק/י איתו`,
        options: { first: ` בטח שאשחק איתו`, second: `לא כרגע` },
        category: "independence"
    },
    {
        id: 21,
        question: `אעדיף כלב שאוהב לקבל יחס מאשר כלב שיודע לדאוג לעצמו`,
        options: { first: `מסכימ/ה`, second: `לא מסכימ/ה` },
        category: "independence"
    },
    {
        id: 22,
        question: `חשוב לי מאוד שהכלב ישמע לפקודות שלי`,
        options: { first: ` נכון`, second: `  לא נכון` },
        category: "focus"
    },

    {
        id: 23,
        question: `חבריי יגדירו אותי כאדם עקשן`,
        options: { first: ` נכון`, second: `לא נכון` },
        category: "focus"
    },
    {
        id: 24,
        question: `חבריי יגדירו אותו כאדם בעל משמעת עצמית גבוהה`,
        options: { first: ` נכון`, second: `לא נכון` },
        category: "focus"
    },
    {
        id: 25,
        question: `כשאני מתחיל/ה משימה, לא אפסיק עד שאסיים אותה בשלמותה`,
        options: { first: ` נכון`, second: `לא נכון` },
        category: "focus"
    },
    {
        id: 26,
        question: `אני אוהב/ת שדברים נעשים בדרך שלי`,
        options: { first: ` נכון`, second: `לא נכון` },
        category: "focus"
    },

    {
        id: 27,
        question: `ארצה ללמד את הכלב שלי פקודות גם אם המשמעות לכך שאעזר במדריך מקצועי`,
        options: { first: ` נכון`, second: `לא נכון` },
        category: "focus"
    }

];
export default QuizData;
