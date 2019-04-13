import {Table, Badge, Popconfirm, Button, Icon, Modal} from 'antd';

const QnList = ({loading, searchState, searchText, Qn, onDelete, showModal}) => {

  const columns = [
    {
      title: 'ID',
      width: '110px',
      dataIndex: 'id',
    },
    {
      title: '问卷标题',
      dataIndex: 'name',
      filteredValue : [searchText],
      onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
      render: text => 
        searchText ? (
          <span>
            {text.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')).map((fragment, i) => (
              fragment.toLowerCase() === searchText.toLowerCase()
                ? <span key={i} style={{color:'#f50'}}>{fragment}</span> : fragment
            ))}
          </span>
        ) : text
    },{
      title: '状态',
      width: '160px',
      dataIndex: 'state',
      filteredValue : [searchState],
      onFilter: (value, record) => record.state == searchState || searchState == 'all',
      render: text => 
        text === 'waiting' ? (
          <Badge status="success" text="待发布" />
        ) : (
          <Badge status="processing" text="已发布" />
        )
    },{
      title: '创建日期',
      width: '180px',
      dataIndex: 'date',
    },{
    title: '操作',
    width: '195px',
    render: (text, record) => {
      return (
        <div>
        <Button style={{"marginRight":"10px"}} onClick={() => showModal(record.id)}>查看问卷</Button>
        <Popconfirm title="确定删除该问卷?" onConfirm={() => onDelete(record.id)}>
            <Button>删除</Button>
        </Popconfirm>
        </div>
      );}
    }
  ];
  return (
    <Table style={{"marginTop":"25px"}}
      loading = {loading}
      rowKey={"id"}
      pagination={{
        pageSize: 6
      }}
      dataSource={Qn}
      columns={columns}
      
    />
  );
};

export default QnList;