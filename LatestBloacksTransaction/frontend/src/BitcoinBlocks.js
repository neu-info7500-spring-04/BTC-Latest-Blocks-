import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tabs, Table } from 'antd';
import './customStyles.css'


function BitcoinBlocks() {
    const [blocks, setBlocks] = useState([]);

    useEffect(() => {
        async function fetchBlocks() {
            try {
                const response = await axios.get('http://localhost:3001/api/blocks');
                setBlocks(response.data.data.bitcoin.blocks);
            } catch (error) {
                console.error('Error fetching Bitcoin blocks:', error);
            }
        }

        fetchBlocks();
    }, []);

    // define table columns
    const columns = [
        {
            title: 'Height',
            dataIndex: 'height',
            key: 'height',
        },
        {
            title: 'Timestamp',
            dataIndex: ['timestamp', 'time'],
            key: 'timestamp',
        },
        {
            title: 'Transactions',
            dataIndex: 'transactionCount',
            key: 'transactions',
        },
        {
            title: 'Size (KB)',
            dataIndex: 'blockSize',
            key: 'size',
        },
        {
            title: 'Weight (KWU)',
            dataIndex: 'blockWeight',
            key: 'weight',
        },
    ];
      const items = [
        {
            key: '1',
            label: 'Dashboard',
              children: (
      <div>
        <div style={{ color: 'white',fontSize:'30px' ,padding:'20px',textAlign:'left'}}>Latest Blocks</div>
                      <Table
                          className="my-custom-table"
          style={{ width: '2000px', backgroundColor: '#1d2127' }}
          dataSource={blocks}
          columns={columns}
          rowKey="height"
        />
      </div>
    ),
        },
            {
    key: '2',
    label: 'Blocks',
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: 'Transactions',
    children: 'Content of Tab Pane 3',
  },
    ];
        // Tab change handler
    const onChange = (key) => {
        console.log(`Active tab key: ${key}`);
    };

    return (
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    );

}

export default BitcoinBlocks;
