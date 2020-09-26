import axios from "axios";
import { SERVER } from "../../config/index.json";

class Meals {
  async GetMeals(school_id: number, office_code: string, date: Date) {
    try {
      const url = `${SERVER}/meal?date=${date}&school_id=${school_id}&office_code=${office_code}`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default new Meals();
