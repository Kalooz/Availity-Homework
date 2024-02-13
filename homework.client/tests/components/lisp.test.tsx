import { act } from "react-dom/test-utils";
import { renderHook } from "@testing-library/react-hooks";
import { useCheckParentheses } from "../../src/lisp/useCheckParentheses";

// Mock fetch function
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("useCheckParentheses", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should set isValid correctly when parentheses are valid", async () => {
    const { result } = renderHook(() => useCheckParentheses());

    mockFetch.mockResolvedValueOnce({ isValid: true });

    await act(async () => {
      await result.current.checkParentheses("(())");
    });

    expect(result.current.isValid).toBe(true);
  });

  it("should set isValid correctly when parentheses are invalid", async () => {
    const { result } = renderHook(() => useCheckParentheses());

    mockFetch.mockResolvedValueOnce({ isValid: false });

    await act(async () => {
      await result.current.checkParentheses("(()))");
    });

    expect(result.current.isValid).toBe(false);
  });

  it("should handle errors when fetching data", async () => {
    const { result } = renderHook(() => useCheckParentheses());

    mockFetch.mockRejectedValueOnce(new Error("Failed to fetch"));

    await act(async () => {
      await result.current.checkParentheses("(())");
    });

    expect(result.current.isValid).toBe(null);
  });
});
