import {
  ActionIcon,
  AspectRatio,
  Button,
  FileButton,
  Group, Image, LoadingOverlay, Modal, MultiSelect, NativeSelect, Paper, Space, Text, TextInput,
} from '@mantine/core';
import { IconCurrencyRupee, IconPhoto } from '@tabler/icons';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { NATIVE_SELECT_DATA } from '../../../constants';
import useGetDishDetails from '../../../hooks/useGetDishDetails';
import useUpdateItem from '../../../hooks/useUpdateDish';
import { makeFormData } from '../../../utils/makeFormData';

function ChangeDisplayProfile({
  url, setLoading, setError, onChange,
}) {
  const [URL, setURL] = useState(null);
  const handleUpload = async (file) => {
    try {
      setLoading(true);
      const { data: { url: cloudinaryURL } } = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`,
        makeFormData({
          upload_preset: import.meta.env.VITE_CLOUDINARY_PRESET,
          cloud_name: import.meta.env.VITE_CLOUDINARY_NAME,
          folder: import.meta.env.VITE_CLOUDINARY_FOLDER,
          file,
        }),
      );
      setURL(cloudinaryURL);
      onChange(cloudinaryURL);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AspectRatio
      ratio={16 / 9}
      style={{
        position: 'relative', border: !url && '1px solid #dbdbd8', borderRadius: '8px',
      }}
    >
      <Image src={URL || url} withPlaceholder radius={8} />
      <FileButton
        onChange={(file) => handleUpload(file)}
        style={{
          position: 'absolute',
          top: '10px',
          left: '90%',
          width: '15px',
          height: '15px',
          display: 'grid',
          placeItems: 'center',
          background: 'rgba(100,100,100,.3)',
        }}
        accept="image/png,image/jpeg,image/jpg"
      >
        {/* eslint-disable react/jsx-props-no-spreading */}
        {(props) => <ActionIcon {...props}><IconPhoto size={18} color="#ffffff" /></ActionIcon>}
      </FileButton>
    </AspectRatio>
  );
}

function EditAndAddModal() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();
  const [catalogueMutate] = useOutletContext();

  const { data, isLoading } = useGetDishDetails(id, {
    onError: (e) => {
      setError({ status: e.status, message: e.response.data.message });
    },
  });
  const { trigger } = useUpdateItem(id, { setError });

  useEffect(() => {
    if (error) { setError(null); }
  }, [formValues]);

  useEffect(() => {
    if (data?.data) { setFormValues(data.data); }
  }, [data]);

  const handleInputChange = (e) => setFormValues((p) => ({
    ...p,
    [e.target.name]: e.target.value?.toLowerCase?.(),
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await trigger(formValues);
      navigate('/catalogue');
      catalogueMutate();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal opened centered withCloseButton={false} onClose={() => navigate('/catalogue')} closeOnClickOutside>
      <Paper
        p="xs"
        style={{
          position: 'relative',
        }}
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <LoadingOverlay visible={isLoading || loading} />

          <ChangeDisplayProfile
            setError={setError}
            setLoading={setLoading}
            url={formValues.imageURL}
            onChange={(url) => setFormValues((p) => ({
              ...p,
              imageURL: url,
            }))}
          />

          <Space h="lg" />
          <Group grow>
            <TextInput
              data-autofocus
              value={formValues.name}
              required
              name="name"
              placeholder="Chole Chawal"
              label="Dish name"
              onChange={(e) => handleInputChange(e)}
            />

            <TextInput
              required
              value={formValues.perPrice}
              icon={<IconCurrencyRupee size={18} />}
              type="number"
              name="perPrice"
              placeholder="50"
              label="Per price"
              onChange={(e) => handleInputChange(e)}
            />
          </Group>

          <NativeSelect
            my={10}
            value={formValues.category}
            onChange={(e) => setFormValues((p) => ({
              ...p,
              category: e.target.value,
            }))}
            data={NATIVE_SELECT_DATA}
            label="Select your category of item"
            withAsterisk
            required
          />

          <MultiSelect
            label="Parts of item"
            data={formValues.parts ?? []}
            placeholder="Add items"
            maxSelectedValues={5}
            searchable
            creatable
            getCreateLabel={(query) => `+ Create ${query}`}
            onCreate={(query) => {
              const item = { value: query.toLowerCase(), label: query };
              setFormValues((p) => {
                console.log(p);
                return {
                  ...p,
                  parts: [...(p?.parts || []), item],
                };
              });
              return item;
            }}
          />
          {error && <Text my={10} fz={12} fw={600} c="red" ta="center">{error.message}</Text>}
          <Group mt="xl">
            <Button mx="auto" color="blue" type="submit">
              Submit Changes
            </Button>
          </Group>
        </form>
      </Paper>
    </Modal>
  );
}

export default EditAndAddModal;
