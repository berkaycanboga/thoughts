import { api, urls } from "../../utils/api/api";
import { searchApiService } from "../../utils/api/search";

jest.mock("../../utils/api/api");

const mockApi = api as jest.Mocked<typeof api>;

describe("searchApiService", () => {
  const searchTerm = "example";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get posts for a search term successfully", async () => {
    const mockUsers = [{ userId: 123 }, { userId: 456 }];
    mockApi.get.mockResolvedValueOnce(mockUsers);

    const result = await searchApiService.getPost(searchTerm);

    expect(mockApi.get).toHaveBeenCalledWith(urls.search(searchTerm));
    expect(result).toEqual(mockUsers);
  });
});
