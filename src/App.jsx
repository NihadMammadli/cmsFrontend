import { useState } from 'react'
import { Row, Col, Table, Typography, message } from "antd";
import style from './assets/style.module.scss'
import View from './View'
import axios from "axios"

function App() {
  const [messageApi, contextHolder] = message.useMessage();

  const [users, setUsers] = useState([])
  const [viewOpen, setViewOpen] = useState(false)
  const [viewData, setViewData] = useState(false)

  const getData = () => {
    axios.get("http://localhost:9999/api/users").then(function (response) {
      messageApi.success('Success');
      setUsers(response?.data?.users)
    })
  }

  const synchronizeData = () => {
    axios.get("http://localhost:10000/api/synchronize").then(function (response) {
      if(response.status==200){
        messageApi.success('Data Synchronized');
      }
    })
  }

  const showView = (data, index) => {
    setViewOpen(true)
    setViewData(data)
  }

  const viewClose = () => {
    setViewOpen(false)
  }

  const columns = [
    {
      title: <div style={{ fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>First Name</div>,
      dataIndex: 'first_name',
      key: 'first_name',
      width: '33%',
      align: 'center',
      render: text => <div style={{ fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{text}</div>,
    },
    {
      title: <div style={{ fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Last Name</div>,
      dataIndex: 'last_name',
      key: 'last_name',
      width: '33%',
      align: 'center',
      render: text => <div style={{ fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{text}</div>,
    },
    {
      title: <div style={{ fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Username</div>,
      dataIndex: 'username',
      key: 'username',
      width: '33%',
      align: 'center',
      render: text => <div style={{ fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{text}</div>,
    },
  ];


  return (
    <>
     {contextHolder}
      <div style={{backgroundColor:"gray"}}>
        <Row style={{ height: "10%", borderBottom: "1px solid black" }}>
          <Col span={13}>
            <Typography style={{ justifyContent: "end", display: "flex", alignItems: "center", height: "60px" }} className={style.Toptext}>
              CMS Dashboard
            </Typography>
          </Col>
          <Col style={{ justifyContent: "end", display: "flex", alignItems: "center", height: "60px" }} span={11}>
            <button className={style.Button} onClick={() => getData()}>
              Get Data
            </button>
            <button className={style.Button} onClick={() => synchronizeData()}>
              Synchronize
            </button>
          </Col>
        </Row>
        <Row style={{ height: "90%" }}>
          <Col span={24}>
            <Table
              columns={columns}
              pagination={false}
              dataSource={users}
              onRow={(record, rowIndex) => ({ onClick: () => showView(record, rowIndex) })}
            />
          </Col >
        </Row>
      </div>

      <View open={viewOpen} close={viewClose} data={viewData} />
    </>
  )
}

export default App
