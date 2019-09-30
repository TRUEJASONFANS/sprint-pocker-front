import { DASHBOARD_PAGE_SIZE } from '@/pages/constants';
import { connect } from 'dva';
import { Table, Pagination, Button} from 'antd';
import { routerRedux } from 'dva/router';
import DashboardItemCreator from '@/pages/dashboard/components/dashboardItemCreator';
import SearchTable from './SearchTable'

function Dashboard({ dispatch, itemList, curPage }) {

    const columns = [
        {
            title: 'Feature',
            dataIndex: 'feature',
            key: 'feature',
            render: text => text,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: text => text,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: text => text
        },
        {
            title: 'Story point',
            dataIndex: 'storyPoint',
            key: 'storyPoint',
            render: text => text
        }
    ];

    function pageChangeHandler(page) {
        dispatch(routerRedux.push({
            pathname: '/dashboard',
            query: { page },
        }));
    }

    function createHandler(newItem) {
        dispatch({
          type: 'dashboard/create',
          payload: newItem,
        });
      }

    return (
        <div>
            <span>
                <DashboardItemCreator onOk={createHandler}>
                    <Button type="primary">Create tickets</Button>
                </DashboardItemCreator>
            </span>
            <SearchTable 
                columns={columns}
                dataSource={itemList}
                pagination={false}
            />
            <Pagination
                className="ant-table-pagination"
                total={20}
                current={curPage}
                pageSize={DASHBOARD_PAGE_SIZE}
                onChange={pageChangeHandler}
            />
        </div>
    );
}

function mapStateToProps(state) {
    const { itemList, curPage } = state.dashboard;
    return {
        itemList,
        curPage
    }
}

export default connect(mapStateToProps)(Dashboard);
