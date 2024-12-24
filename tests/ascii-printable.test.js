import { test, expect } from "vitest"
import { LexiRank, AsciiPrintableCharSet } from "../src"

const lexirank = new LexiRank(new AsciiPrintableCharSet())

test("between()", () => {
	expect(lexirank.between("A", "C")).toBe("B")
	expect(lexirank.between("#", "3")).toBe("+")
	expect(lexirank.between("#Ab6$", "3gJ^&")).toBe("+")
	expect(lexirank.between("!", "!!O")).toBe("!!8")
	expect(lexirank.between("}}", "}}O")).toBe("}}8")
})

test("between() when there is no space", () => {
	expect(lexirank.between("A", "B")).toBe("AO")
	expect(lexirank.between("AAA", "AAB")).toBe("AAAO")
	expect(lexirank.between("4", "5")).toBe("4O")
})

test("before()", () => {
	expect(lexirank.before("O")).toBe("8")
	expect(lexirank.before("#")).toBe('"')
	expect(lexirank.before('"')).toBe("!O")
	expect(lexirank.before('!"')).toBe("!!O")
	expect(lexirank.before('!!"')).toBe("!!!O")
})

test("after()", () => {
	expect(lexirank.after("O")).toBe("f")
	expect(lexirank.after("|")).toBe("}")
	expect(lexirank.after("}")).toBe("}O")
	expect(lexirank.after("}}")).toBe("}}O")
	expect(lexirank.after("}}}")).toBe("}}}O")
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
