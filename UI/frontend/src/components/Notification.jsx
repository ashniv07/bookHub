import React, { useState, useEffect } from 'react';
import { Popover, Typography, IconButton } from '@mui/material';
import { FaBell } from 'react-icons/fa';
import axios from '../setupAxios'; // Ensure this path is correct
import CloseIcon from '@mui/icons-material/Close';
import Lottie from 'lottie-react'; // Import Lottie component
import animationData from '../assets/owl.json'; // Import your Lottie JSON file

const Notifications = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('token');
    const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : null;

    useEffect(() => {
        if (userId) {
            const fetchNotifications = async () => {
                try {
                    const response = await axios.get(`/notification/user/${userId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setNotifications(response.data);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching notifications:", error);
                    setNotifications([]);
                    setLoading(false);
                }
            };

            fetchNotifications();
        }
    }, [userId, token]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const markAsRead = async (notificationId) => {
        try {
            await axios.put(`/notification/read/${notificationId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setNotifications(notifications.map(notif => 
                notif.id === notificationId ? { ...notif, isRead: true } : notif
            ));
            // Delete the notification if marked as read
            await axios.delete(`/notification/delete/${notificationId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setNotifications(notifications.filter(notif => notif.id !== notificationId));
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }
    };

    const open = Boolean(anchorEl);
    const id = open ? 'notifications-popover' : undefined;

    return (
        <div>
            <IconButton 
                aria-describedby={id} 
                onClick={handleClick} 
                style={{ 
                    position: 'fixed', 
                    top: '103px', 
                    right: '160px', 
                    backgroundColor: '#4c3228', 
                    color: 'white', 
                    padding: '10px', 
                    borderRadius: '50%', 
                    zIndex: 1000,
                    fontWeight: 'bold',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                }}
            >
                <FaBell size={24} />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div style={{ 
                    position: 'relative', 
                    padding: 50, 
                    maxWidth: 400,
                    maxHeight: '85vh',
                    overflowY: 'auto',
                    background:'#261709'
                }}>
                    <IconButton 
                        onClick={handleClose} 
                        style={{ 
                            position: 'absolute', 
                            top: 10, 
                            right: 10, 
                            color: '#fff' 
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    {loading ? (
                        <Typography>Loading notifications...</Typography>
                    ) : notifications.length === 0 ? (
                        <Typography style={{ color: '#fff' }}>No notifications</Typography>
                    ) : (
                        <div>
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                marginBottom: '20px'
                            }}>
                                <Lottie 
                                    animationData={animationData} 
                                    loop={true} 
                                    style={{ 
                                        width: '70px', 
                                        height: '70px', 
                                        marginRight: '1px' 
                                    }} 
                                />
                                <Typography 
                                    variant="h6" 
                                    style={{ 
                                        color: '#fff', 
                                        fontSize: '30px', 
                                        textAlign: 'center', 
                                        marginBottom: '0' 
                                    }}
                                >
                                    Notifications
                                </Typography>
                            </div>
                            {notifications.map((notif) => (
                                <div key={notif.id} style={{ 
                                    marginBottom: 20, 
                                    padding: 20, 
                                    width: '100%', 
                                    border: '1px solid #4c3228', 
                                    borderRadius: '8px', 
                                    backgroundColor: '#f9f9f9', 
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                                    textAlign: 'center', 
                                    position: 'relative' 
                                }}>
                                    <Typography 
                                        variant="body1" 
                                        style={{ 
                                            marginBottom: 20, 
                                            color: '#333', 
                                            fontSize: '20px', 
                                            fontWeight: '500' 
                                        }}
                                    >
                                        {notif.message}
                                    </Typography>
                                    {!notif.isRead && (
                                        <button 
                                            onClick={() => markAsRead(notif.id)} 
                                            style={{ 
                                                padding: '10px 20px', 
                                                backgroundColor: '#4c3228', 
                                                color: 'white', 
                                                border: 'none', 
                                                borderRadius: '5px', 
                                                cursor: 'pointer', 
                                                fontSize: '14px', 
                                                fontWeight: 'bold', 
                                                transition: 'background-color 0.3s ease', 
                                                display: 'block', 
                                                margin: '0 auto'
                                            }}
                                            onMouseEnter={(e) => e.target.style.backgroundColor = '#3b2519'}
                                            onMouseLeave={(e) => e.target.style.backgroundColor = '#4c3228'}
                                        >
                                            Mark as read
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Popover>
        </div>
    );
};

export default Notifications;
