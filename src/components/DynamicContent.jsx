import { Layout, Menu, Button, DatePicker, Select, Table, Tabs } from "antd";
const { Content } = Layout;
const { TabPane } = Tabs;

// demo data for the table
const tableData = [
	{
		key: "1",
		attributes: "Campaign A",
		visits: 120,
		lViews: 100,
		lClicks: 80,
		lCtr: "80%",
		oViews: 50,
		conv: 20,
		cost: 100,
		roi: "20%",
		pAndL: 20,
		revenue: 120,
	},
	{
		key: "2",
		attributes: "Campaign B",
		visits: 150,
		lViews: 120,
		lClicks: 90,
		lCtr: "75%",
		oViews: 60,
		conv: 25,
		cost: 120,
		roi: "20.83%",
		pAndL: 25,
		revenue: 145,
	},
];

// Table columns definition
const tableColumns = [
	{ title: "Attributes", dataIndex: "attributes", key: "attributes" },
	{ title: "Visits", dataIndex: "visits", key: "visits" },
	{ title: "L-Views", dataIndex: "lViews", key: "lViews" },
	{ title: "L-Clicks", dataIndex: "lClicks", key: "lClicks" },
	{ title: "L-CTR", dataIndex: "lCtr", key: "lCtr" },
	{ title: "O-Views", dataIndex: "oViews", key: "oViews" },
	{ title: "Conv", dataIndex: "conv", key: "conv" },
	{ title: "Cost", dataIndex: "cost", key: "cost" },
	{ title: "ROI", dataIndex: "roi", key: "roi" },
	{ title: "P & L", dataIndex: "pAndL", key: "pAndL" },
	{ title: "Revenue", dataIndex: "revenue", key: "revenue" },
];

const DynamicContent = () => {
	const tabItems = [
		{
			key: "1",
			label: "Grid",
			children: (
				<Table
					dataSource={tableData}
					columns={tableColumns}
					pagination={false}
				/>
			),
		},
		{
			key: "2",
			label: "List",
			children: "Content of Tab 2",
		},
	];
	return (
		<Content
			style={{
				margin: "24px 16px",
				padding: 24,
				minHeight: 280,
				backgroundColor: "#fff",
			}}>
			<Tabs
				defaultActiveKey="1"
				items={tabItems}
				style={{ marginBottom: 16 }}
			/>
		</Content>
	);
};
export default DynamicContent;
