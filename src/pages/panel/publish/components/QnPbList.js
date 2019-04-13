import {Table, Button } from 'antd';

const QnPbList = ({loading, searchText, Qn ,showModal,publishQn}) => {

  const columns = [
    {
      title: 'ID',
      width: '110px',
      dataIndex: 'id',
      filteredValue : ['publishing'],
      onFilter: (value, record) => record.state == 'waiting'
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
      title: '创建日期',
      width: '180px',
      dataIndex: 'date',
    },{
    title: '',
    width: '228px',
    render: (text, record) => {
      return (
        <div>
        <Button style={{"marginRight":"10px"}} onClick={() => showModal(record.id)}>查看问卷</Button>
        <Button style={{"marginRight":"10px"}} onClick={() => publishQn(record.id)}>发布问卷</Button>
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

export default QnPbList;