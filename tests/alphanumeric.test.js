import { test, expect } from "vitest"
import { LexiRank, AlphanumericCharSet } from "../src"

const lexirank = new LexiRank(new AlphanumericCharSet())

test("between()", () => {
	expect(lexirank.between("A", "C")).toBe("B")
	expect(lexirank.between("2", "4")).toBe("3")
	expect(lexirank.between("3AbD2", "F78Xs")).toBe("9")
	expect(lexirank.between("0", "00U")).toBe("00F")
	expect(lexirank.between("zz", "zzU")).toBe("zzF")
})

test("between() when there is no space", () => {
	expect(lexirank.between("A", "B")).toBe("AU")
	expect(lexirank.between("AAA", "AAB")).toBe("AAAU")
	expect(lexirank.between("4", "5")).toBe("4U")
})

test("before()", () => {
	expect(lexirank.before("U")).toBe("F")
	expect(lexirank.before("2")).toBe("1")
	expect(lexirank.before("1")).toBe("0U")
	expect(lexirank.before("01")).toBe("00U")
	expect(lexirank.before("001")).toBe("000U")
})

test("after()", () => {
	expect(lexirank.after("U")).toBe("j")
	expect(lexirank.after("x")).toBe("y")
	expect(lexirank.after("y")).toBe("yU")
	expect(lexirank.after("yy")).toBe("yyU")
	expect(lexirank.after("yyy")).toBe("yyyU")
})

test("before() works the same as between() with only next", () => {
	expect(lexirank.before("A")).toBe(lexirank.between(undefined, "A"))
})

test("after() works the same as between() with only prev", () => {
	expect(lexirank.after("A")).toBe(lexirank.between("A", undefined))
})

test("mid() works the same as between() without arguments", () => {
	expect(lexirank.mid()).toBe(lexirank.between())
})

test("throws if non-string passed", () => {
	expect(() => lexirank.between("A", 3)).toThrow(
		`prev and next can only be string`,
	)
	expect(() => lexirank.between(3, "A")).toThrow(
		`prev and next can only be string`,
	)
})

test("throws if empty string passed", () => {
	expect(() => lexirank.between("A", "")).toThrow(
		`prev and next can't be an empty string`,
	)
	expect(() => lexirank.between("", "A")).toThrow(
		`prev and next can't be an empty string`,
	)
})

test("throws if arguments are the same", () => {
	expect(() => lexirank.between("A", "A")).toThrow(
		`prev should be smaller than next`,
	)
	expect(() => lexirank.between("AAAAAAA", "AAAAAAA")).toThrow(
		`prev should be smaller than next`,
	)
})

test("throws if prev > next", () => {
	expect(() => lexirank.between("B", "A")).toThrow(
		`prev should be smaller than next`,
	)
})

test("throws if invalid character passed", () => {
	expect(() => lexirank.between("A", "ß")).toThrow(
		`contains invalid characters`,
	)
})
