import axios from "axios";
import { SERVER } from "../../config/index.json";

class Schedule {
  async GetSchedules(school_id: string, office_code: string, date: Date) {
    try {
      const url = `${SERVER}/schedule?school_id=${school_id}&office_code=${office_code}&date=${date}`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default new Schedule();
