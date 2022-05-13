import React, { useEffect, useState } from "react";
import api from "../../../api";
import SelectField from "../../common/form/selectField";
import TextField from "../../common/form/textField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { validator } from "../../../utils/validator";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const EditUserPage = ({ userId }) => {
    const [user, setUser] = useState();
    const [professions, setProfession] = useState([]);
    const [qualities, setQualities] = useState([]);
    const [qualitiesUser, setQualitiesUser] = useState([]);
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setUser(data);
            const qualitiesListUser = data.qualities.map((quality) => ({
                value: quality._id,
                label: quality.name,
                color: quality.color
            }));
            setQualitiesUser(qualitiesListUser);
        });
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Обязательно введите имя"
            }
        }
    };

    const validate = () => {
        const errors = validator(user, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        validate();
    }, [user]);

    const isValid = Object.keys(errors).length === 0;

    const handleChange = (target) => {
        console.log(target.name, target.value);
        setUser((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const handleChangeProfession = (target) => {
        setUser((prevState) => ({
            ...prevState,
            [target.name]: getProfessionById(target.value)
        }));
    };
    const handleChangeQualities = (target) => {
        setUser((prevState) => ({
            ...prevState,
            [target.name]: getQualities(target.value)
        }));
    };
    const handleSaveUser = () => {
        api.users.update(userId, user).then(() => {
            history.push(`/users/${userId}`);
            console.log(user);
        });
    };
    if (user && qualitiesUser.length !== 0) {
        console.log(user.profession.name);
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <form>
                            <TextField
                                label="Имя"
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                error={errors.email}
                            />

                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={user.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Пол"
                            />
                            <SelectField
                                label="Профессия"
                                defaultOption={user.profession.name}
                                options={professions}
                                name="profession"
                                value={""}
                                onChange={handleChangeProfession}
                                error={errors.profession}
                            />
                            <MultiSelectField
                                options={qualities}
                                onChange={handleChangeQualities}
                                defaultValue={qualitiesUser}
                                name="qualities"
                                label="Качества"
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />
                            <button
                                className="btn btn-primary w-100 mx-auto"
                                type="button"
                                disabled={!isValid}
                                onClick={handleSaveUser}
                            >
                                Сохранить изменения
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    } else {
        return <span>Loading...</span>;
    }
};
EditUserPage.propTypes = {
    userId: PropTypes.string
};

export default EditUserPage;
