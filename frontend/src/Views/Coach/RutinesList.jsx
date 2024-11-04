import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getGroupRutines } from '../../features/group/groupSlice';
import LoadingSpinner from '../../shared/components/spinner/LoadingSpinner';
import { Button, List, Typography } from 'antd';
import { MdDelete } from 'react-icons/md';
import { getRutines } from '../../features/rutinas/rutinasSlice';
import { format } from "date-fns";

const RutinesList = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const token = useSelector((state) => state.auths.token);
  const rutinas = useSelector((state) => state.rutinas.rutinas);
  const isLoading = useSelector((state) => state.rutinas.isLoading);
  const user = useSelector((state) => state.users.user);
  const [dispatched, setDispatched] = useState(false);

  useEffect(() => {
    if (user?.Client && !dispatched) {
      if (!rutinas || rutinas.length === 0) {
        dispatch(getRutines(user?.Client?.idClient));
        setDispatched(true);
      }
    }
  }, [rutinas, user, dispatched]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  console.log(rutinas);
  

  return (
    <div className="mt-20 p-4">
      <Typography.Title level={3}>Listado de Rutinas</Typography.Title>
      {rutinas?.length > 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={rutinas}
          renderItem={(r) => (
            <List.Item
              actions={[
                <Button
                  type="danger"
                  icon={<MdDelete />}
                  onClick={() => handleDeleteRoutine(r.routine.id)}
                >
                  Eliminar
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={<Typography.Text strong>{r.routine.name}</Typography.Text>}
                description={
                  <>
                    <Typography.Paragraph>
                      <strong>Fecha de inicio:</strong> {format(new Date(r.routine.startDate), 'dd/MM/yyyy')}
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                      <strong>Fecha de finalización:</strong> {format(new Date(r.routine.endDate), 'dd/MM/yyyy')}
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                      <strong>Objetivo:</strong> {r.routine.objective}
                    </Typography.Paragraph>
                  </>
                }
              />
            </List.Item>
          )}
        />
      ) : (
        <Typography.Paragraph>No hay rutinas disponibles.</Typography.Paragraph>
      )}
    </div>
  )
}

export default RutinesList