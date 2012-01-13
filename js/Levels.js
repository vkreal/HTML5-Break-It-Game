var level_1 = [
            [
                { active: true, life: 3 }, { active: true }, {}, {}, {}, {}, {}, { active: true }, { active: true }, {}, { active: true }, { active: true }, {}, {}, {}, {}, {}, { active: true }, { active: true }, {}
            ],
            [
                { active: true, life: 3 }, { active: true }, { active: true }, {}, {}, {}, {}, { active: true }, { active: true }, { active: true }, { active: true }, {}, {}, {}, {}, {}, { active: true }, { active: true }, { active: true }, {}
            ],
            [
                {}, {active:true, life:3}, {active:true}, {active:true}, {}, {}, {}, {active:true}, {active:true}, {active:true}, {}, {}, {}, {}, {}, {active:true}, {active:true}, {active:true}, {}, {}
            ],
            [
                {}, {}, { active: true }, { active: true }, { active: true }, {}, {}, { active: true }, { active: true }, { active: true }, { active: true }, {}, {}, {}, { active: true }, { active: true }, { active: true, ball: true }, {}, {}, {}
            ],
            [
                {}, {}, {}, { active: true }, { active: true }, { active: true }, {}, { active: true }, { active: true }, {}, { active: true }, { active: true }, {}, { active: true }, { active: true }, { active: true, ball: true }, {}, {}, {}, {}
            ],
            [
                {}, {}, {}, {}, {active:true}, {active:true}, {active:true}, {}, {}, {}, {}, {}, {active:true}, {active:true}, {active:true}, {}, {}, {}, {}, {}
            ],
            [
                {}, {}, {}, {}, {}, { active: true, unbreakable: true }, { active: true, unbreakable: true }, { active: true, unbreakable: true }, {}, {}, {}, { active: true, unbreakable: true }, { active: true, unbreakable: true }, { active: true, unbreakable: true }, {}, {}, {}, {}, {}, {}
            ],
            [
                {}, {}, {}, {}, {}, {}, { active: true, unbreakable: true }, { active: true }, { active: true }, {}, { active: true }, { active: true }, { active: true, unbreakable: true }, {}, {}, {}, {}, {}, {}, {}
            ],
            [
                {}, {}, {}, {}, {}, {}, {}, { active: true, unbreakable: true }, { active: true, ball: true }, { active: true }, { active: true }, { active: true, unbreakable: true }, {}, {}, {}, {}, {}, {}, {}, {}
            ],
            [
                {}, {}, {}, {}, {}, {}, {}, {}, { active: true, unbreakable: true }, { active: true, unbreakable: true }, { active: true, unbreakable: true }, {}, {}, {}, {}, {}, {}, {}, {}, {}
            ]

        ];

var GameOptions = { 
        
        levels: [
        /// level 1
            {
                locked: false,
                score: 0,
                level:[
                        [
                            {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
                        ],
                        [
                            {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
                        ],
                        [
                            {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
                        ],
                        [
                            {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
                        ],
                        [
                            {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
                        ],
                        [
                            {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
                        ],
                        [
                            {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
                        ],
                        [
                            {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
                        ],
                        [
                            {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
                        ],
                        [
                            {}, {}, {}, {}, {}, {}, {}, { active: true, life: 3 }, { active: true, life: 3 }, { active: true, unbreakable: true }, { active: true, unbreakable: true }, {}, {}, {}, {}, {}, {}, {}, {}, {}
                        ]
                    ]
            },
            {
                /// level 2
                score: 0,
                level:[
                    [
                        {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
                    ],
                    [
                        {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
                    ],
                    [
                        {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
                    ],
                    [
                        {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
                    ],
                    [
                        {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
                    ],
                    [
                        {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
                    ],
                    [
                        {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
                    ],
                    [
                        {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
                    ],
                    [
                        {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
                    ],
                    [
                        {}, {}, {}, {}, {}, {}, {}, { active: true, life: 3 }, { active: true, life: 3 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
                    ]
                ]
            },
            // level 3
            {
                score: 0,
                level: [
                        [
                             {}, { active: true, life: 3 }, { active: true, life: 3 }, { active: true, life: 3 }, {}
                        ]
                    ]
            },
            {
                // level 4
                score: 0,
                level: level_1
            },
            {
                // level 4
                score: 0,
                level: level_1
            },
            {
                // level 4
                score: 0,
                level: level_1
            },
            {
                // level 4
                score: 0,
                level: level_1
            },
            {
                // level 4
                score: 0,
                level: level_1
            }
        ]
};