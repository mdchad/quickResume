import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'

import { useState } from 'react'
import Steps from '@/components/Steps'
import SideNav from '@/components/SideNav'
import { getSession } from "next-auth/react";

function Personal({ setPersonalResult }) {
  const [fullName, setFullName] = useState('')

  async function onSubmit(event) {
    event.preventDefault()
    setPersonalResult(fullName)
  }

  return (
      <form action="#" className="mt-12 grid grid-cols-1 gap-y-8">
        <TextField
            label="Full Name"
            id="full-name"
            name="full-name"
            type="text"
            required
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
        />
        {/*<TextField*/}
        {/*    label=""*/}
        {/*    id="skills"*/}
        {/*    name="skills"*/}
        {/*    type="text"*/}
        {/*    placeholder="e.g Javascript, Excel"*/}
        {/*    required*/}
        {/*    onChange={(e) => setSkillInput(e.target.value)}*/}
        {/*    value={skillInput}*/}
        {/*/>*/}
        <div className="flex w-full">
          <Button
              type="submit"
              variant="solid"
              color="blue"
              className=""
              onClick={onSubmit}
          >
          <span>
            Add <span aria-hidden="true">&rarr;</span>
          </span>
          </Button>
        </div>
      </form>
  )
}

function Education({ setEducationResult }) {
  const [educationInput, setEducationInput] = useState('')
  const [universityInput, setUniversityInput] = useState('')

  async function onSubmit(event) {
    event.preventDefault()
    setEducationResult(educationInput)
    setUniversityInput('')
    setEducationInput('')
  }

  return (
      <form action="#" className="mt-12 grid grid-cols-1 gap-y-8">
        <TextField
            label="Add your education"
            id="education"
            name="education"
            type="text"
            placeholder="Bachelor in Computer Science"
            required
            onChange={(e) => setEducationInput(e.target.value)}
            value={educationInput}
        />
        <TextField
            label="Add your university"
            id="university"
            name="university"
            type="text"
            placeholder="e.g Harvard"
            required
            onChange={(e) => setUniversityInput(e.target.value)}
            value={universityInput}
        />
        <div className="flex w-full">
          <Button
              type="submit"
              variant="solid"
              color="blue"
              className=""
              onClick={onSubmit}
          >
          <span>
            Add <span aria-hidden="true">&rarr;</span>
          </span>
          </Button>
        </div>
      </form>
  )
}

function Professional({ setProfessionalResult }) {
  const [professionInput, setProfessionInput] = useState('')
  const [skillInput, setSkillInput] = useState('')
  const [companyInput, setCompanyInput] = useState('')

  async function onSubmit(event) {
    event.preventDefault()
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ profession: professionInput, skill: skillInput, company: companyInput }),
    })
    const data = await response.json()
    console.log(data.result)
    setProfessionalResult(data.result)
    setSkillInput('')
    setProfessionInput('')
  }

  return (
    <form action="#" className="mt-12 grid grid-cols-1 gap-y-8">
      <TextField
        label="Add your profession"
        id="profession"
        name="profession"
        type="text"
        placeholder="Business analyst"
        required
        onChange={(e) => setProfessionInput(e.target.value)}
        value={professionInput}
      />
      <TextField
          label="Add your company"
          id="company"
          name="company"
          type="text"
          placeholder="e.g Microsoft"
          required
          onChange={(e) => setCompanyInput(e.target.value)}
          value={companyInput}
      />
      <TextField
        label="Add your skills"
        id="skills"
        name="skills"
        type="text"
        placeholder="e.g Javascript, Excel"
        required
        onChange={(e) => setSkillInput(e.target.value)}
        value={skillInput}
      />
      <div className="flex w-full">
        <Button
          type="submit"
          variant="solid"
          color="blue"
          className=""
          onClick={onSubmit}
        >
          <span>
            Generate <span aria-hidden="true">&rarr;</span>
          </span>
        </Button>
      </div>
    </form>
  )
}

export default function Dashboard() {
  const [personalResult, setPersonalResult] = useState()
  const [educationResult, setEducationResult] = useState()
  const [professionalResult, setProfessionalResult] = useState()

  const [formSection, setFormSection] = useState('personal')

  return (
    <SideNav>
      <div className="mx-auto md:flex max-w-7xl px-4 sm:px-6">
        <div className="mt-16 md:w-full">
          <div className="block w-full h-max rounded-md border-gray-300 shadow-2xl sm:text-sm p-10">
            <p>{personalResult}</p>
            <p>{educationResult}</p>
            <p style={{whiteSpace: "pre-line"}}>{professionalResult}</p>
          </div>
          {/*<textarea*/}
          {/*  className="mt-6 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"*/}
          {/*  rows={30}*/}
          {/*  value={personalResult + " " + educationResult}*/}
          {/*/>*/}
        </div>

        <div className="mt-16 md:ml-10 sm:ml-6 md:w-full">
          <Steps setStep={setFormSection} stepValue={formSection}/>
          {formSection === 'personal' && <Personal setPersonalResult={setPersonalResult}/>}
          {formSection === 'education' && <Education setEducationResult={setEducationResult}/>}
          {formSection === 'professional' && <Professional setProfessionalResult={setProfessionalResult}/>}
        </div>
      </div>
    </SideNav>
  )
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: { destination: "/login" },
    };
  }

  return {
    props: {},
  }
}
