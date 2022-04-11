import { FC, useState } from "react";
import { Input, Card, Avatar, message } from "antd";
import "antd/dist/antd.css";
import "./App.less";
const { Search } = Input;
const { Meta } = Card;
interface IInfo {
  code: number;
  qq: string;
  name: string;
  qlogo: string;
  lvzuan: any;
}

interface IError {
  code: number;
  msg: string;
}

const search: FC = () => {
  const [qq, setQq] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const [info, setInfo] = useState<IInfo | null>(null);

  const search = () => {
    setInfo(null);
    setLoading(true);
    fetch("https://api.uomg.com/api/qq.info?qq=" + qq, {
      method: "GET",
    }).then((res) => {
      setLoading(false);
      res.json().then((res: IInfo) => {
        if (res.qq) {
          setInfo(res);
        } else {
          message.error(res.msg);
        }
      });
    });
  };

  return (
    <div className="search">
      <div className="searchCondition">
        <Search
          loading={loading}
          value={qq}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setQq(e.target.value);
          }}
          style={{ width: 250 }}
          onPressEnter={() => {
            search();
          }}
          onSearch={() => {
            search();
          }}
        ></Search>
      </div>
      <div className="searchResult">
        {info && (
          <Card style={{ width: 300 }}>
            <Meta
              avatar={<Avatar src={info?.qlogo} />}
              title={info?.name}
              description={info?.qq}
            />
          </Card>
        )}
      </div>
    </div>
  );
};

export default search;
