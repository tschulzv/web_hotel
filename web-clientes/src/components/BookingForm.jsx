import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap'; // Removed Image as it's not used

function BookingForm({ handleInputChange: propHandleInputChange, showRoomSelector, toggleRoomSelector, handleRoomChange, rooms, addRoom, removeRoom, searchTariffs }) {
  // Internal state for check-in and check-out dates
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  useEffect(() => {
  if (checkIn) {
    // Si checkOut no existe o es menor que checkIn, lo actualizamos
    if (!checkOut || new Date(checkOut) < new Date(checkIn)) {
      setCheckOut(checkIn);
      propHandleInputChange({ target: { name: 'checkOut', value: checkIn } });
    }
  }
  }, [checkIn]);

  const handleCheckInChange = (e) => {
    const value = e.target.value;
    setCheckIn(value);
    propHandleInputChange(e); // Pass the event up to the parent handler

    // When check-in changes, adjust check-out if it's no longer valid
    if (checkOut && new Date(value) > new Date(checkOut)) {
      setCheckOut(value); // Set checkout to be the same as check-in
      propHandleInputChange({ target: { name: 'checkOut', value: value } });
    }
  };

  const handleCheckOutChange = (e) => {
    const value = e.target.value;
    setCheckOut(value);
    propHandleInputChange(e); // Pass the event up to the parent handler
  };

  const today = new Date().toISOString().split('T')[0];

  // Calculate the minimum date for check-out. It should be at least checkIn, or today if checkIn isn't set.
  const minCheckOutDate = checkIn ? checkIn : today;

  return (
    <Row className="bg-light-gray py-4 d-flex align-items-center justify-content-center w-100 mb-5">
      <div className="text-center mb-4">
        <h2 className="subtitle">Haz tu reserva</h2>
      </div>

      {/* Inputs de Check-In y Check-Out */}
      <Col md={5} className="d-flex flex-column align-items-center justify-content-center px-4">
        <div className="d-flex w-100">
          <div className="me-2 w-50">
            <label htmlFor="check-in">Check-In</label>
            <input
              name="checkIn"
              type="date"
              id="check-in"
              className="w-100 form-control"
              value={checkIn} // Controlled component
              onChange={handleCheckInChange}
              min={today} // Avoid dates before today
            />
          </div>
          <div className="w-50">
            <label htmlFor="check-out">Check-Out</label>
            <input
              name="checkOut"
              type="date"
              id="check-out"
              className="w-100 form-control"
              value={checkOut} // Controlled component
              onChange={handleCheckOutChange}
              min={minCheckOutDate} // Set min date for checkout dynamically
            />
          </div>
        </div>
      </Col>

      {/* Botón para abrir selector de habitaciones */}
      <Col md={5} className="d-flex flex-column align-items-center justify-content-center px-4 position-relative">
        <label>Habitaciones</label>
        <button
          className="w-75 form-control btn btn-outline-secondary"
          onClick={toggleRoomSelector}
        >
          {rooms.length} Habitación{rooms.length > 1 ? "es" : ""} -{" "}
          {rooms.reduce((acc, room) => acc + room.adults, 0)} Adulto
          {rooms.reduce((acc, room) => acc + room.adults, 0) > 1 ? "s" : ""},{" "}
          {rooms.reduce((acc, room) => acc + room.children, 0)} Niño
          {rooms.reduce((acc, room) => acc + room.children, 0) > 1 ? "s" : ""}
        </button>

        {showRoomSelector && (
          <div
            className="bg-white border rounded p-3 shadow"
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
              zIndex: 1000,
            }}
          >
            {rooms.map((room, index) => (
              <div key={index} className="border-bottom pb-2 mb-2">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="mb-0">Habitación {index + 1}</h6>
                  {rooms.length > 1 && (
                    <button className="btn btn-danger btn-sm" onClick={() => removeRoom(index)}>
                      ×
                    </button>
                  )}
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <div className="w-50 px-2">
                    <label className="form-label">Adultos</label>
                    <input
                      type="number"
                      min="1"
                      value={room.adults}
                      className="form-control"
                      onChange={(e) => handleRoomChange(index, "adults", Number(e.target.value))}
                    />
                  </div>
                  <div className="w-50 px-2">
                    <label className="form-label">Niños</label>
                    <input
                      type="number"
                      min="0"
                      value={room.children}
                      className="form-control"
                      onChange={(e) => handleRoomChange(index, "children", Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            ))}
            <button className="btn btn-primary w-100 mt-2" onClick={addRoom}>
              + Agregar Habitación
            </button>
          </div>
        )}
      </Col>

      <Col md={2}>
        <button type="submit" className="btn btn-primary fw-bolder" onClick={searchTariffs}>
          Buscar tarifas
        </button>
      </Col>
    </Row>
  );
}

export default BookingForm;