/*
--- Day 5: How About a Nice Game of Chess? ---

You are faced with a security door designed by Easter Bunny engineers that seem to
have acquired most of their security knowledge by watching hacking movies.

The eight-character password for the door is generated one character at a time by
finding the MD5 hash of some Door ID (your puzzle input) and an increasing integer index (starting with 0).

A hash indicates the next character in the password if its hexadecimal representation starts with five zeroes.
If it does, the sixth character in the hash is the next character of the password.

For example, if the Door ID is abc:

    - The first index which produces a hash that starts with five zeroes is 3231929, which we find by 
        hashing abc3231929; the sixth character of the hash, and thus the first character of the password, is 1.
    - 5017308 produces the next interesting hash, which starts with 000008f82...,
        so the second character of the password is 8.
    - The third time a hash starts with five zeroes is for abc5278568, discovering the character f.

In this example, after continuing this search a total of eight times, the password is 18f47a30.

Given the actual Door ID, what is the password?

*/

namespace AdventOfCodeDay5Part1 {

    class HowAboutANiceGameOfChess {

        private _input: string;

        public constructor(input: string) {
            this._input = input;
        };

        public getPassword(): string {
            let password: string = "";
            let pwd: Md5 = new Md5();
            let i: number = 0;

            while (password.length < 8) {
                let prevLength: number = password.length;

                while (prevLength === password.length) {
                    let md5: string = pwd.md5(this._input + i);
                    i++;

                    if (md5.substring(0, 5) === "00000") {
                        password += md5.substring(5, 6);
                        console.log(md5, password, i);
                        break;
                    }
                }
            }
            return password;
        }
    }

    class Md5 {

        public md5(s: string): string {
            return this.hex(this.md51(s));
        }

        private md5cycle(x: Array<number>, k: Array<number>): void {
            let a: number = x[0];
            let b: number = x[1];
            let c: number = x[2];
            let d: number = x[3];

            a = this.ff(a, b, c, d, k[0], 7, -680876936);
            d = this.ff(d, a, b, c, k[1], 12, -389564586);
            c = this.ff(c, d, a, b, k[2], 17, 606105819);
            b = this.ff(b, c, d, a, k[3], 22, -1044525330);
            a = this.ff(a, b, c, d, k[4], 7, -176418897);
            d = this.ff(d, a, b, c, k[5], 12, 1200080426);
            c = this.ff(c, d, a, b, k[6], 17, -1473231341);
            b = this.ff(b, c, d, a, k[7], 22, -45705983);
            a = this.ff(a, b, c, d, k[8], 7, 1770035416);
            d = this.ff(d, a, b, c, k[9], 12, -1958414417);
            c = this.ff(c, d, a, b, k[10], 17, -42063);
            b = this.ff(b, c, d, a, k[11], 22, -1990404162);
            a = this.ff(a, b, c, d, k[12], 7, 1804603682);
            d = this.ff(d, a, b, c, k[13], 12, -40341101);
            c = this.ff(c, d, a, b, k[14], 17, -1502002290);
            b = this.ff(b, c, d, a, k[15], 22, 1236535329);

            a = this.gg(a, b, c, d, k[1], 5, -165796510);
            d = this.gg(d, a, b, c, k[6], 9, -1069501632);
            c = this.gg(c, d, a, b, k[11], 14, 643717713);
            b = this.gg(b, c, d, a, k[0], 20, -373897302);
            a = this.gg(a, b, c, d, k[5], 5, -701558691);
            d = this.gg(d, a, b, c, k[10], 9, 38016083);
            c = this.gg(c, d, a, b, k[15], 14, -660478335);
            b = this.gg(b, c, d, a, k[4], 20, -405537848);
            a = this.gg(a, b, c, d, k[9], 5, 568446438);
            d = this.gg(d, a, b, c, k[14], 9, -1019803690);
            c = this.gg(c, d, a, b, k[3], 14, -187363961);
            b = this.gg(b, c, d, a, k[8], 20, 1163531501);
            a = this.gg(a, b, c, d, k[13], 5, -1444681467);
            d = this.gg(d, a, b, c, k[2], 9, -51403784);
            c = this.gg(c, d, a, b, k[7], 14, 1735328473);
            b = this.gg(b, c, d, a, k[12], 20, -1926607734);

            a = this.hh(a, b, c, d, k[5], 4, -378558);
            d = this.hh(d, a, b, c, k[8], 11, -2022574463);
            c = this.hh(c, d, a, b, k[11], 16, 1839030562);
            b = this.hh(b, c, d, a, k[14], 23, -35309556);
            a = this.hh(a, b, c, d, k[1], 4, -1530992060);
            d = this.hh(d, a, b, c, k[4], 11, 1272893353);
            c = this.hh(c, d, a, b, k[7], 16, -155497632);
            b = this.hh(b, c, d, a, k[10], 23, -1094730640);
            a = this.hh(a, b, c, d, k[13], 4, 681279174);
            d = this.hh(d, a, b, c, k[0], 11, -358537222);
            c = this.hh(c, d, a, b, k[3], 16, -722521979);
            b = this.hh(b, c, d, a, k[6], 23, 76029189);
            a = this.hh(a, b, c, d, k[9], 4, -640364487);
            d = this.hh(d, a, b, c, k[12], 11, -421815835);
            c = this.hh(c, d, a, b, k[15], 16, 530742520);
            b = this.hh(b, c, d, a, k[2], 23, -995338651);

            a = this.ii(a, b, c, d, k[0], 6, -198630844);
            d = this.ii(d, a, b, c, k[7], 10, 1126891415);
            c = this.ii(c, d, a, b, k[14], 15, -1416354905);
            b = this.ii(b, c, d, a, k[5], 21, -57434055);
            a = this.ii(a, b, c, d, k[12], 6, 1700485571);
            d = this.ii(d, a, b, c, k[3], 10, -1894986606);
            c = this.ii(c, d, a, b, k[10], 15, -1051523);
            b = this.ii(b, c, d, a, k[1], 21, -2054922799);
            a = this.ii(a, b, c, d, k[8], 6, 1873313359);
            d = this.ii(d, a, b, c, k[15], 10, -30611744);
            c = this.ii(c, d, a, b, k[6], 15, -1560198380);
            b = this.ii(b, c, d, a, k[13], 21, 1309151649);
            a = this.ii(a, b, c, d, k[4], 6, -145523070);
            d = this.ii(d, a, b, c, k[11], 10, -1120210379);
            c = this.ii(c, d, a, b, k[2], 15, 718787259);
            b = this.ii(b, c, d, a, k[9], 21, -343485551);

            x[0] = this.add32(a, x[0]);
            x[1] = this.add32(b, x[1]);
            x[2] = this.add32(c, x[2]);
            x[3] = this.add32(d, x[3]);
        }

        private cmn(q: number, a: number, b: number, x: number, s: number, t: number): number {
            a = this.add32(this.add32(a, q), this.add32(x, t));
            return this.add32((a << s) | (a >>> (32 - s)), b);
        }

        private ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
            return this.cmn((b & c) | ((~b) & d), a, b, x, s, t);
        }

        private gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
            return this.cmn((b & d) | (c & (~d)), a, b, x, s, t);
        }

        private hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
            return this.cmn(b ^ c ^ d, a, b, x, s, t);
        }

        private ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
            return this.cmn(c ^ (b | (~d)), a, b, x, s, t);
        }

        private md51(s: string): Array<number> {
            let n: number = s.length;
            let state: Array<number> = [1732584193, -271733879, -1732584194, 271733878];
            let i: number;

            for (i = 64; i <= s.length; i += 64) {
                this.md5cycle(state, this.md5blk(s.substring(i - 64, i)));
            }
            s = s.substring(i - 64);
            let tail: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (i = 0; i < s.length; i++) {
                tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
            }
            tail[i >> 2] |= 0x80 << ((i % 4) << 3);
            if (i > 55) {
                this.md5cycle(state, tail);
                for (i = 0; i < 16; i++) {
                    tail[i] = 0;
                }
            }
            tail[14] = n * 8;
            this.md5cycle(state, tail);
            return state;
        }

        private md5blk(s: string): Array<number> {
            let md5blks: Array<number> = [];
            let i: number;
            for (i = 0; i < 64; i += 4) {
                md5blks[i >> 2] = s.charCodeAt(i)
                    + (s.charCodeAt(i + 1) << 8)
                    + (s.charCodeAt(i + 2) << 16)
                    + (s.charCodeAt(i + 3) << 24);
            }
            return md5blks;
        }

        private rhex(n: number): string {
            let s: string = "";
            let j: number;
            let hexChr: Array<string> = "0123456789abcdef".split("");
            for (j = 0; j < 4; j++) {
                s += hexChr[(n >> (j * 8 + 4)) & 0x0F] + hexChr[(n >> (j * 8)) & 0x0F];
            }
            return s;
        }

        private hex(x: Array<number>): string {
            let y: Array<string> = [];
            for (let i: number = 0; i < x.length; i++) {
                y[i] = this.rhex(x[i]);
            }
            return y.join("");
        }

        private add32(x: number, y: number): number {
            return (x + y) & 0xFFFFFFFF;
        }
    }

    /**
     * TESTS
     */
    interface ITestInputsObject {
        "input": string;
        "result": string;
    }

    let testInputs: Array<ITestInputsObject> = [
        {
            "input": "abc",
            "result": "18f47a30"
        }
    ];

    for (let testInput of testInputs) {
        let codeTest: HowAboutANiceGameOfChess = new HowAboutANiceGameOfChess(testInput.input);
        let test: string = codeTest.getPassword();

        if (test !== testInput.result) {
            throw "Test failed: (" + typeof test + ")" + test +
            " !== (" + typeof testInput.result + ")" + testInput.result;
        }
    }

    /**
     * SOLUTION
     */
    let input: string = "ugkcyxxp";

    let solution: HowAboutANiceGameOfChess = new HowAboutANiceGameOfChess(input);
    console.log("Password: ", solution.getPassword());
}
