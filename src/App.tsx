import { FC, useState } from "react";
import { Input, Card, Avatar, message } from "antd";
import "antd/dist/antd.css";
import "./App.less";
const { Search } = Input;
const { Meta } = Card;
interface IInfo {
  code: number;
  qq?: string;
  name?: string;
  qlogo?: string;
  lvzuan?: any;
  msg?: string;
}

const search: FC = () => {
  const [qq, setQq] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const [info, setInfo] = useState<IInfo | null>(null);

  // 请求响应是 {code:number,msg:string,data:IInfo | null},
  // code 最好是标准状态码
  // data只需返回 name, qlogo, qq
  // 请求地址应是 /api/qq/info

  const search = () => {
    setInfo(null);
    setLoading(true);
    fetch("https://api.uomg.com/api/qq.info?qq=" + qq, {
      method: "GET",
    }).then((res) => {
      setLoading(false);
      res.json().then((res: IInfo) => {
        if (res.code === 1) {
          setInfo(res);
        } else {
          message.error(res.msg);
        }
      });
    });
  };

  return (
    <div className="search">
      <h1>QQ号查询</h1>
      <div className="searchCondition">
        <Search
          loading={loading}
          placeholder="请输入qq号码"
          value={qq}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setQq(e.target.value);
          }}
          style={{ width: 250 }}
          onPressEnter={search}
          onSearch={search}
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
