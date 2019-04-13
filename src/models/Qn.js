const testQue = [
    {
        type : 'single',
        title : '你最喜欢哪一项？',
        option : [
            '第一项',
            '第二项',
            '第三项',
        ],
        check : 1
    },
    {
        type : 'multiple',
        title : '你最喜欢哪几项？',
        option : [
            '第一项',
            '第二项',
            '第三项',
            '第四项',
        ],
        check : [1,2]
    },
    {
        type : 'singleline',
        title : '你喜欢什么？'
    },
    {
        type : 'multiline',
        title : '你喜欢什么？'
    },
];

export default {
    namespace : 'Qn',
    state:[
        {name: '测试问卷1' , id: 1 ,state:'waiting' ,date : "2018-11-11",questions:testQue},
        {name: '测试问卷2' , id: 2,state:'publishing' ,date : "2018-11-11",questions:testQue},
        {name: '测试问卷3' , id: 3,state:'publishing' ,date : "2018-11-11",questions:testQue},
        {name: '测试问卷4' , id: 4,state:'waiting' ,date : "2018-11-11",questions:testQue},
        {name: '测试测试问卷5' , id: 5 ,state:'publishing' ,date : "2018-11-11",questions:testQue},
        {name: '测试测试问卷6' , id: 6,state:'publishing' ,date : "2018-11-11",questions:testQue},
        {name: '测试测试问卷7' , id: 7,state:'waiting' ,date : "2018-11-11",questions:testQue},
        {name: '问卷888888' , id: 8,state:'publishing' ,date : "2018-11-11",questions:testQue},
        {name: '问卷8888889999' , id: 9 ,state:'waiting' ,date : "2018-11-11",questions:testQue},
        {name: '问卷1010101010' , id: 10,state:'publishing' ,date : "2018-11-11",questions:testQue},
        {name: '问卷111111111111111' , id: 11,state:'publishing' ,date : "2018-11-11",questions:testQue},
        {name: '问卷121212212112211212' , id: 12,state:'waiting' ,date : "2018-11-11",questions:testQue},
        {name: '问卷133333333333333333' , id: 13,state:'publishing' ,date : "2018-11-11",questions:testQue},
        {name: '问卷问卷问卷问卷问卷问卷' , id: 14,state:'waiting' ,date : "2018-11-11",questions:testQue}
    ],
    reducers: {
        'add'(state=this.state, {payload : newqs}){
            state.push(newqs);
            return state;
        },
        'delete'(state=this.state, {payload : id}){
            return state.filter(stateItem => stateItem.id !== id)
        }
    },

    effects: {
        *addQn({ payload, query }, { call, put }){
            const { qs } = payload;
            const request = new Request('https://kvv.me/qnAPI/addQn.php', {
                method: 'POST',
                body : JSON.stringify({'userid': localStorage.getItem('userid') , ...qs }),
                headers: new Headers({ 'Content-Type': 'application/json' }),
            });
            const temp = yield fetch(request);
            const data = yield temp.json();
            console.log('REQUEST DATA:' + JSON.stringify(data));
            if(data.success == 1){
                const newqs = {
                    id: data.id,
                    name : qs.name,
                    state : qs.state,
                    date : qs.date,
                    questions: qs.questions
                };
                //console.log(newqs);
                yield put({
                    type: 'add',
                    payload: newqs,
                });
            }else{
                console.log('ADDQN ERROR!')
            }
        },

        *deleteQn({ payload, query }, { call, put }){
            const { qnid } = payload;
            const request = new Request('https://kvv.me/qnAPI/deleteQn.php', {
                method: 'POST',
                body : JSON.stringify({'userid': localStorage.getItem('userid') , 'qnid':qnid }),
                headers: new Headers({ 'Content-Type': 'application/json' }),
            });
            const temp = yield fetch(request);
            const data = yield temp.json();
            console.log('REQUEST DATA:' + JSON.stringify(data));
            if(data.success == 1){
                yield put({
                    type: 'delete',
                    payload: qnid,
                });
            }else{
                console.log('DELETEQN ERROR!')
            }
        },

        *findQn({ payload, callback }, { call, put }){
            const { qnid } = payload;
            const request = new Request('https://kvv.me/qnAPI/findQn.php', {
                method: 'POST',
                body : JSON.stringify({'qnid':qnid }),
                headers: new Headers({ 'Content-Type': 'application/json' }),
            });
            const temp = yield fetch(request);
            const data = yield temp.json();
            console.log('REQUEST DATA:' + JSON.stringify(data));
            if(data.success == 1){
                if (callback && typeof callback === 'function') {
                    callback(data.qn);
                }
            }else{
                console.log('FINDQN ERROR!')
            }
        }

    }
}