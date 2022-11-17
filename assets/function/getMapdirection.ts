export const getMapDirection = (order: number, lang: string = "") => {
    const map = [
        `!1m18!1m12!1m3!1d98122.04942958633!2d64.34039692183411!3d39.77750716415544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f50060e65993cd5%3A0xc87beaf40e48e767!2sBukhara%2C%20Uzbekistan!5e0!3m2!1s${lang}!2s!4v1668577564972!5m2!1s${lang}!2s`,
        `!1m18!1m12!1m3!1d24550.24828881343!2d64.5305584019624!3d39.722103329786165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f501c978bc545a7%3A0x59d1d62dfa88415a!2z0JrQsNCz0LDQvSwg0KPQt9Cx0LXQutC40YHRgtCw0L0!5e0!3m2!1s${lang}!2s!4v1668580968149!5m2!1s${lang}!2s`,
        `!1m18!1m12!1m3!1d395416.0305357809!2d63.77688453270138!3d39.26130672113454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4542f37c4ed8cb%3A0xf8679f6ad86159af!2z0JDQu9Cw0YLRgdC60LjQuSDRgNCw0LnQvtC9LCDQo9C30LHQtdC60LjRgdGC0LDQvQ!5e0!3m2!1s${lang}!2s!4v1668581743574!5m2!1s${lang}!2s`,
        `!1m18!1m12!1m3!1d1560111.5551576107!2d62.40725028735472!3d40.20699681698236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f50060e65993cd5%3A0x7d54acc77acd3717!2z0JHRg9GF0LDRgNCwLCDQo9C30LHQtdC60LjRgdGC0LDQvQ!5e0!3m2!1s${lang}!2s!4v1668582865283!5m2!1s${lang}!2s`,
        `!1m18!1m12!1m3!1d390300.80068065977!2d64.23717344377782!3d40.15954374431857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f5064fdf461ad23%3A0xe271154f5639d099!2z0JLQsNCx0LrQtdC90YLRgdC60LjQuSDRgNCw0LnQvtC9LCDQo9C30LHQtdC60LjRgdGC0LDQvQ!5e0!3m2!1s${lang}!2s!4v1668582988160!5m2!1s${lang}!2s`,
        `!1m18!1m12!1m3!1d775264.6234743502!2d63.59128798978606!3d40.62155753911658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f50e9c13a4ac0e9%3A0x15c0e77422065!2z0JPQuNC20LTRg9Cy0LDQvdGB0LrQuNC5LCDQo9C30LHQtdC60LjRgdGC0LDQvQ!5e0!3m2!1s${lang}!2s!4v1668583079749!5m2!1s${lang}!2s`,
        `!1m18!1m12!1m3!1d782406.8255292213!2d62.84085456699746!3d40.00226735676601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f5b00b985e2ec5d%3A0xa2c2ffc1e7861d0!2z0JTQttCw0L3QtNCw0YDRgdC60LjQuSDRgNCw0LnQvtC9LCDQo9C30LHQtdC60LjRgdGC0LDQvQ!5e0!3m2!1s${lang}!2s!4v1668583171071!5m2!1s${lang}!2s`,
        `!1m18!1m12!1m3!1d196494.51373492824!2d64.3742889137511!3d39.68960481243548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f5006228f119a41%3A0xae3044949cdc70f9!2z0JrQsNCz0LDQvdGB0LrQuNC5INGA0LDQudC-0L0sINCj0LfQsdC10LrQuNGB0YLQsNC9!5e0!3m2!1s${lang}!2s!4v1668583242381!5m2!1s${lang}!2s`,
        `!1m18!1m12!1m3!1d783788.8779651204!2d62.469228706188055!3d39.88151040837539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f5b74369babc343%3A0x20ac37d12e4c1341!2z0JrQsNGA0LDQutGD0LvRjNGB0LrQuNC5INGA0LDQudC-0L0sINCj0LfQsdC10LrQuNGB0YLQsNC9!5e0!3m2!1s${lang}!2s!4v1668583372100!5m2!1s${lang}!2s`,
        `!1m18!1m12!1m3!1d1547406.0714127505!2d61.90104258546329!3d40.755921302764364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f5969c3d2514a0b%3A0xa9a6a0477e41b75b!2z0J_QtdGI0LrRg9C90YHQutC40Lkg0YDQsNC50L7QvSwg0KPQt9Cx0LXQutC40YHRgtCw0L0!5e0!3m2!1s${lang}!2s!4v1668583444376!5m2!1s${lang}!2s`,
        `!1m18!1m12!1m3!1d776902.7478542436!2d62.63557849971159!3d40.48021238540862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f5bb76eadf8b7e5%3A0xb54369f5aaca6ee8!2z0KDQvtC80LjRgtCw0L3RgdC60LjQuSDRgNCw0LnQvtC9LCDQo9C30LHQtdC60LjRgdGC0LDQvQ!5e0!3m2!1s${lang}!2s!4v1668583541091!5m2!1s${lang}!2s`,
        `!1m18!1m12!1m3!1d394342.07831774297!2d64.39892066357761!3d39.45130900614099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4fc1f97283345d%3A0xac06a314ab3fdba8!2z0JrQsNGA0LDRg9C70LHQsNC30LDRgNGB0LrQuNC5INGA0LDQudC-0L0sINCj0LfQsdC10LrQuNGB0YLQsNC9!5e0!3m2!1s${lang}!2s!4v1668583611725!5m2!1s${lang}!2s`,
        `!1m18!1m12!1m3!1d48812.21545140332!2d64.44270999424104!3d40.125274450608714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f507ac4af36c249%3A0x87c120c8e7e7622d!2z0KjQsNGE0LjRgNC60LDQvSwg0KPQt9Cx0LXQutC40YHRgtCw0L0!5e0!3m2!1s${lang}!2s!4v1668583664020!5m2!1s${lang}!2s`];

    return map[order];
};