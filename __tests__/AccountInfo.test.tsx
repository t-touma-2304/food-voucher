import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AccountInfo from "@/layout/AccountInfo";

// ログイン済みかをチェックする useSession をモックにし、
// 常にログイン済み状態で user.name: testing を返すようにする。
jest.mock("next-auth/react", () => {
  // Require the original module to not be mocked.
  const originalModule = jest.requireActual("next-auth/react");
  // セッションに保存する情報をモックとしてリテラルで作成する。
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: {
      //id: "cl7ts8yvu0045ssa2e2vcrezk",
      name: "testing",
      email: "testing@ts.occ.co.jp",
    },
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: "authenticated" };
    }),
  };
});

describe("AccountInfo", () => {
  it("renders a logged in user.", () => {
    render(<AccountInfo />);

    //screen.debug();
    const logged_in_user = screen.getByText("Signed in as testing");

    expect(logged_in_user).toBeInTheDocument();
  });
});