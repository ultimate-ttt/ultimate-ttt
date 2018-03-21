// this is a finished board
/*
 with the following situation: (empty = not finished)
 O O O
 X O
   X
 */
const boardStateMock = [
    {
        value: 1,
        position: {
            x: 0,
            y: 0
        },
        tiles: [
            {
                boardPosition: {
                    x: 0,
                    y: 0
                },
                position: {
                    x: 0,
                    y: 0
                },
                value: 0
            },
            {
                boardPosition: {
                    x: 0,
                    y: 0
                },
                position: {
                    x: 0,
                    y: 1
                },
                value: 1
            },
            {
                boardPosition: {
                    x: 0,
                    y: 0
                },
                position: {
                    x: 0,
                    y: 2
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 0,
                    y: 0
                },
                position: {
                    x: 1,
                    y: 0
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 0,
                    y: 0
                },
                position: {
                    x: 1,
                    y: 1
                },
                value: 1
            },
            {
                boardPosition: {
                    x: 0,
                    y: 0
                },
                position: {
                    x: 1,
                    y: 2
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 0,
                    y: 0
                },
                position: {
                    x: 2,
                    y: 0
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 0,
                    y: 0
                },
                position: {
                    x: 2,
                    y: 1
                },
                value: 1
            },
            {
                boardPosition: {
                    x: 0,
                    y: 0
                },
                position: {
                    x: 2,
                    y: 2
                },
                value: 2
            }
        ]
    },
    {
        value: 1,
        position: {
            x: 0,
            y: 1
        },
        tiles: [
            {
                boardPosition: {
                    x: 0,
                    y: 1
                },
                position: {
                    x: 0,
                    y: 0
                },
                value: 0
            },
            {
                boardPosition: {
                    x: 0,
                    y: 1
                },
                position: {
                    x: 0,
                    y: 1
                },
                value: 1
            },
            {
                boardPosition: {
                    x: 0,
                    y: 1
                },
                position: {
                    x: 0,
                    y: 2
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 0,
                    y: 1
                },
                position: {
                    x: 1,
                    y: 0
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 0,
                    y: 1
                },
                position: {
                    x: 1,
                    y: 1
                },
                value: 1
            },
            {
                boardPosition: {
                    x: 0,
                    y: 1
                },
                position: {
                    x: 1,
                    y: 2
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 0,
                    y: 1
                },
                position: {
                    x: 2,
                    y: 0
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 0,
                    y: 1
                },
                position: {
                    x: 2,
                    y: 1
                },
                value: 1
            },
            {
                boardPosition: {
                    x: 0,
                    y: 1
                },
                position: {
                    x: 2,
                    y: 2
                },
                value: 2
            }
        ]
    },
    {
        value: 1,
        position: {
            x: 0,
            y: 2
        },
        tiles: [
            {
                boardPosition: {
                    x: 0,
                    y: 2
                },
                position: {
                    x: 0,
                    y: 0
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 0,
                    y: 2
                },
                position: {
                    x: 0,
                    y: 1
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 0,
                    y: 2
                },
                position: {
                    x: 0,
                    y: 2
                },
                value: 1
            },
            {
                boardPosition: {
                    x: 0,
                    y: 2
                },
                position: {
                    x: 1,
                    y: 0
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 0,
                    y: 2
                },
                position: {
                    x: 1,
                    y: 1
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 0,
                    y: 2
                },
                position: {
                    x: 1,
                    y: 2
                },
                value: 1
            },
            {
                boardPosition: {
                    x: 0,
                    y: 2
                },
                position: {
                    x: 2,
                    y: 0
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 0,
                    y: 2
                },
                position: {
                    x: 2,
                    y: 1
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 0,
                    y: 2
                },
                position: {
                    x: 2,
                    y: 2
                },
                value: 1
            }
        ]
    },
    {
        value: 0,
        position: {
            x: 1,
            y: 0
        },
        tiles: [
            {
                boardPosition: {
                    x: 1,
                    y: 0
                },
                position: {
                    x: 0,
                    y: 0
                },
                value: 1
            },
            {
                boardPosition: {
                    x: 1,
                    y: 0
                },
                position: {
                    x: 0,
                    y: 1
                },
                value: 0
            },
            {
                boardPosition: {
                    x: 1,
                    y: 0
                },
                position: {
                    x: 0,
                    y: 2
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 1,
                    y: 0
                },
                position: {
                    x: 1,
                    y: 0
                },
                value: 0
            },
            {
                boardPosition: {
                    x: 1,
                    y: 0
                },
                position: {
                    x: 1,
                    y: 1
                },
                value: 0
            },
            {
                boardPosition: {
                    x: 1,
                    y: 0
                },
                position: {
                    x: 1,
                    y: 2
                },
                value: 1
            },
            {
                boardPosition: {
                    x: 1,
                    y: 0
                },
                position: {
                    x: 2,
                    y: 0
                },
                value: 1
            },
            {
                boardPosition: {
                    x: 1,
                    y: 0
                },
                position: {
                    x: 2,
                    y: 1
                },
                value: 0
            },
            {
                boardPosition: {
                    x: 1,
                    y: 0
                },
                position: {
                    x: 2,
                    y: 2
                },
                value: 2
            }
        ]
    },
    {
        value: 1,
        position: {
            x: 1,
            y: 1
        },
        tiles: [
            {
                boardPosition: {
                    x: 1,
                    y: 1
                },
                position: {
                    x: 0,
                    y: 0
                },
                value: 0
            },
            {
                boardPosition: {
                    x: 1,
                    y: 1
                },
                position: {
                    x: 0,
                    y: 1
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 1,
                    y: 1
                },
                position: {
                    x: 0,
                    y: 2
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 1,
                    y: 1
                },
                position: {
                    x: 1,
                    y: 0
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 1,
                    y: 1
                },
                position: {
                    x: 1,
                    y: 1
                },
                value: 0
            },
            {
                boardPosition: {
                    x: 1,
                    y: 1
                },
                position: {
                    x: 1,
                    y: 2
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 1,
                    y: 1
                },
                position: {
                    x: 2,
                    y: 0
                },
                value: 1
            },
            {
                boardPosition: {
                    x: 1,
                    y: 1
                },
                position: {
                    x: 2,
                    y: 1
                },
                value: 1
            },
            {
                boardPosition: {
                    x: 1,
                    y: 1
                },
                position: {
                    x: 2,
                    y: 2
                },
                value: 1
            }
        ]
    },
    {
        value: 2,
        position: {
            x: 1,
            y: 2
        },
        tiles: [
            {
                boardPosition: {
                    x: 1,
                    y: 2
                },
                position: {
                    x: 0,
                    y: 0
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 1,
                    y: 2
                },
                position: {
                    x: 0,
                    y: 1
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 1,
                    y: 2
                },
                position: {
                    x: 0,
                    y: 2
                },
                value: 0
            },
            {
                boardPosition: {
                    x: 1,
                    y: 2
                },
                position: {
                    x: 1,
                    y: 0
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 1,
                    y: 2
                },
                position: {
                    x: 1,
                    y: 1
                },
                value: 0
            },
            {
                boardPosition: {
                    x: 1,
                    y: 2
                },
                position: {
                    x: 1,
                    y: 2
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 1,
                    y: 2
                },
                position: {
                    x: 2,
                    y: 0
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 1,
                    y: 2
                },
                position: {
                    x: 2,
                    y: 1
                },
                value: 1
            },
            {
                boardPosition: {
                    x: 1,
                    y: 2
                },
                position: {
                    x: 2,
                    y: 2
                },
                value: 2
            }
        ]
    },
    {
        value: 2,
        position: {
            x: 2,
            y: 0
        },
        tiles: [
            {
                boardPosition: {
                    x: 2,
                    y: 0
                },
                position: {
                    x: 0,
                    y: 0
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 2,
                    y: 0
                },
                position: {
                    x: 0,
                    y: 1
                },
                value: 0
            },
            {
                boardPosition: {
                    x: 2,
                    y: 0
                },
                position: {
                    x: 0,
                    y: 2
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 2,
                    y: 0
                },
                position: {
                    x: 1,
                    y: 0
                },
                value: 1
            },
            {
                boardPosition: {
                    x: 2,
                    y: 0
                },
                position: {
                    x: 1,
                    y: 1
                },
                value: 1
            },
            {
                boardPosition: {
                    x: 2,
                    y: 0
                },
                position: {
                    x: 1,
                    y: 2
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 2,
                    y: 0
                },
                position: {
                    x: 2,
                    y: 0
                },
                value: 0
            },
            {
                boardPosition: {
                    x: 2,
                    y: 0
                },
                position: {
                    x: 2,
                    y: 1
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 2,
                    y: 0
                },
                position: {
                    x: 2,
                    y: 2
                },
                value: 2
            }
        ]
    },
    {
        value: 0,
        position: {
            x: 2,
            y: 1
        },
        tiles: [
            {
                boardPosition: {
                    x: 2,
                    y: 1
                },
                position: {
                    x: 0,
                    y: 0
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 2,
                    y: 1
                },
                position: {
                    x: 0,
                    y: 1
                },
                value: 0
            },
            {
                boardPosition: {
                    x: 2,
                    y: 1
                },
                position: {
                    x: 0,
                    y: 2
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 2,
                    y: 1
                },
                position: {
                    x: 1,
                    y: 0
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 2,
                    y: 1
                },
                position: {
                    x: 1,
                    y: 1
                },
                value: 0
            },
            {
                boardPosition: {
                    x: 2,
                    y: 1
                },
                position: {
                    x: 1,
                    y: 2
                },
                value: 0
            },
            {
                boardPosition: {
                    x: 2,
                    y: 1
                },
                position: {
                    x: 2,
                    y: 0
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 2,
                    y: 1
                },
                position: {
                    x: 2,
                    y: 1
                },
                value: 0
            },
            {
                boardPosition: {
                    x: 2,
                    y: 1
                },
                position: {
                    x: 2,
                    y: 2
                },
                value: 2
            }
        ]
    },
    {
        value: 2,
        position: {
            x: 2,
            y: 2
        },
        tiles: [
            {
                boardPosition: {
                    x: 2,
                    y: 2
                },
                position: {
                    x: 0,
                    y: 0
                },
                value: 0
            },
            {
                boardPosition: {
                    x: 2,
                    y: 2
                },
                position: {
                    x: 0,
                    y: 1
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 2,
                    y: 2
                },
                position: {
                    x: 0,
                    y: 2
                },
                value: 0
            },
            {
                boardPosition: {
                    x: 2,
                    y: 2
                },
                position: {
                    x: 1,
                    y: 0
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 2,
                    y: 2
                },
                position: {
                    x: 1,
                    y: 1
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 2,
                    y: 2
                },
                position: {
                    x: 1,
                    y: 2
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 2,
                    y: 2
                },
                position: {
                    x: 2,
                    y: 0
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 2,
                    y: 2
                },
                position: {
                    x: 2,
                    y: 1
                },
                value: 2
            },
            {
                boardPosition: {
                    x: 2,
                    y: 2
                },
                position: {
                    x: 2,
                    y: 2
                },
                value: 2
            }
        ]
    }
];
export default boardStateMock;