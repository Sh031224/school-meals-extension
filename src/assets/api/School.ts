import axios from "axios";
import { SERVER } from "../../config/index.json";

class School {
  async SearchSchool(school_name: string) {
    try {
      const url = `${SERVER}/search?school_name=${school_name}`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default new School();
